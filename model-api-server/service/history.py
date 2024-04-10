from models import History
from sqlalchemy.orm import Session
from datetime import datetime
from schemas.history import OpenAiHistory, AnthropicHistory


def create_openai_history(db: Session, params: OpenAiHistory):
    db_history = History(
            model=params.model,
            user_message=params.user_message,
            system_message=params.system_message,
            answer=params.answer,
            max_tokens=params.max_tokens,
            top_p=params.top_p,
            frequency_penalty=params.frequency_penalty,
            presence_penalty=params.presence_penalty,
            temperature=params.temperature,
            response_model=params.response_model,
            completion_tokens=params.completion_tokens,
            prompt_tokens=params.prompt_tokens,
            total_tokens=params.total_tokens,
            create_date=datetime.now()
        )
    db.add(db_history)
    db.commit()
    return db_history.id

def create_anthropic_history(db: Session, params: AnthropicHistory):
    db_history = History(
            model=params.model,
            user_message=params.user_message,
            system_message=params.system_message,
            answer=params.answer,
            max_tokens=params.max_tokens,
            top_p=params.top_p,
            temperature=params.temperature,
            input_tokens=params.input_tokens,
            output_tokens=params.output_tokens,
            create_date=datetime.now()
        )
    db.add(db_history)
    db.commit()
    return db_history.id

def get_all_history(db: Session):
    return db.query(History).all()

def search_history(db: Session, start: int, limit: int, start_date: datetime, end_date: datetime, order_by: str):
    query = db.query(History)
    if start_date:
        query = query.filter(History.create_date >= start_date)
    if end_date:
        query = query.filter(History.create_date <= end_date)
    if order_by:
        if order_by == "asc":
            query = query.order_by(History.create_date.asc())
        else:
            query = query.order_by(History.create_date.desc())
    if start:
        query = query.offset(start)
    if limit:
        query = query.limit(limit)
    return query.all()
