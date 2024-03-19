from fastapi import APIRouter, Depends, HTTPException, status
from database import get_db
from openai import OpenAI
from sqlalchemy.orm import Session
from service.api_key import get_api_key

router = APIRouter(
    prefix="/openai",
)

tags = ["openai"]

@router.post("/", tags=tags)
def gpt_api(query: str, db: Session = Depends(get_db)):
    OPENAI_API_KEY = get_api_key(db, "OpenAI")
    client = OpenAI(api_key=OPENAI_API_KEY)
    response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": query},
    ],
    )
    
    return response

