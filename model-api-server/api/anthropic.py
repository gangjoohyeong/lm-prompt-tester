from fastapi import APIRouter, Depends
from database import get_db
from sqlalchemy.orm import Session
from service.api_key import get_api_key
import anthropic
from schemas.anthropic import AnthropicGenerate

router = APIRouter(
    prefix="/anthropic",
)

@router.post("/", tags=['model'])
def anthropic_api(params: AnthropicGenerate, db: Session = Depends(get_db)):
    ANTHROPIC_API_KEY = get_api_key(db, "Anthropic")
    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
    message = client.messages.create(
        model=params.model,
        max_tokens=params.max_tokens,
        temperature=params.temperature,
        system=params.system_message,
        messages=[
            {"role": "user", "content": params.user_message},
        ]
    )
    return message