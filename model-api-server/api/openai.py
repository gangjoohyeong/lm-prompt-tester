from fastapi import APIRouter, Depends, HTTPException, status
from database import get_db
from openai import OpenAI
from sqlalchemy.orm import Session
from service.api_key import get_api_key
from schemas.openai import OpenAiGenerate

router = APIRouter(
    prefix="/openai",
)

@router.post("/", tags=['model'])
def gpt_api(params: OpenAiGenerate, db: Session = Depends(get_db)):
    OPENAI_API_KEY = get_api_key(db, "OpenAI")
    client = OpenAI(api_key=OPENAI_API_KEY)
    response = client.chat.completions.create(
    model=params.model,
    messages=[
        {"role": "system", "content": params.system_message},
        {"role": "user", "content": params.user_message},
    ],
    max_tokens=params.max_tokens,
    top_p=params.top_p,
    frequency_penalty=params.frequency_penalty,
    presence_penalty=params.presence_penalty,
    temperature=params.temperature,
    )
    
    return response

