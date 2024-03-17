from fastapi import APIRouter, Depends, HTTPException, status
from database import get_db
from schemas.api_key import insertApiKey
from service.api_key import insert_api_key

router = APIRouter(
    prefix="/api-keys",
)

tags = ["api-keys"]

@router.post("/", tags=tags)
def api_key_insert(api_key: insertApiKey, db = Depends(get_db)):
    api_key_id = insert_api_key(db, api_key)
    return {"API Key가 추가되었습니다.": api_key_id}