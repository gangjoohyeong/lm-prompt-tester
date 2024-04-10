from fastapi import APIRouter, Depends, Query, HTTPException, status
from database import get_db
from sqlalchemy.orm import Session
from schemas.history import OpenAiHistory, AnthropicHistory, HistoryId
from service.history import create_openai_history, create_anthropic_history, search_history
from models import History
from datetime import datetime
from typing import Optional

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
def history_search(
        db: Session = Depends(get_db), 
        start: Optional[int] = Query(None, description="Start row"), 
        limit: Optional[int] = Query(None, description="Number of rows to return starting from start"),
        start_date: Optional[datetime] = Query(None, description="Start create date"),
        end_date: Optional[datetime] = Query(None, description="End create date"),
        order_by: Optional[str] = Query(None, description="Order by create date (asc or desc)")):
    
    search_history_result = search_history(db, start, limit, start_date, end_date, order_by)
    
    if not search_history_result:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No history found")
    
    return search_history_result