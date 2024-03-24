from fastapi import APIRouter, Depends, HTTPException, status
from database import get_db
from sqlalchemy.orm import Session
from schemas.history import OpenAiHistory, AnthropicHistory, HistoryId
from service.history import create_openai_history, create_anthropic_history

router = APIRouter(
    prefix="/history",
)

@router.post("/openai-history", tags=['history'], response_model=HistoryId)
def create_history_openai(params: OpenAiHistory, db: Session = Depends(get_db)):
    history_id = create_openai_history(db, params)
    return {"id": history_id}


@router.post("/anthropic-history", tags=['history'])
def create_history_anthropic(params: AnthropicHistory, db: Session = Depends(get_db)):
    history_id = create_anthropic_history(db, params)
    return {"id": history_id}
