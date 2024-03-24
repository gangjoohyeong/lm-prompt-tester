from fastapi import APIRouter, Depends, HTTPException, status
from database import get_db
from sqlalchemy.orm import Session
from schemas.history import OpenAiHistory, AnthropicHistory, HistoryId
from service.history import create_openai_history, create_anthropic_history, get_all_history
from models import History

router = APIRouter(
    prefix="/history",
)

tags = ["history"]

@router.post("/openai-history", tags=tags, response_model=HistoryId)
def history_openai_create(params: OpenAiHistory, db: Session = Depends(get_db)):
    history_id = create_openai_history(db, params)
    return {"id": history_id}


@router.post("/anthropic-history", tags=tags)
def history_anthropic_create(params: AnthropicHistory, db: Session = Depends(get_db)):
    history_id = create_anthropic_history(db, params)
    return {"id": history_id}

@router.get("/", tags=tags)
def all_history_get(db: Session = Depends(get_db)):
    all_history = get_all_history(db)
    print(all_history)
    return all_history