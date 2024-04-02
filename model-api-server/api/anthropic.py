from fastapi import APIRouter, Depends, HTTPException, status
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
    if ANTHROPIC_API_KEY is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Anthropic API key not found")
    
    try:
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
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")