from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from database import get_db
from schemas.api_key import ApiKeyBase, ApiKeyOnly, ApiKeyName, ApiKeyInsert, ApiKeyUpdate
from service.api_key import get_all_api_keys, insert_api_key, get_api_key, update_api_key, delete_api_key
from sqlalchemy.orm import Session


router = APIRouter(
    prefix="/api-keys",
)

tags = ["api-keys"]

@router.get("/", tags=tags, response_model=List[ApiKeyBase])
def api_key_get_all(db: Session = Depends(get_db)):
    api_keys = get_all_api_keys(db)
    if api_keys:
        return api_keys
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No API keys found")
       
        
@router.post("/", tags=tags, response_model=ApiKeyOnly)
def api_key_insert(api_key: ApiKeyInsert, db: Session = Depends(get_db)):
    api_key_id = insert_api_key(db, api_key)
    return {"key": api_key_id}


@router.get("/{api_key_name}", tags=tags, response_model=ApiKeyOnly)
def api_key_get_by_name(api_key_name: str, db: Session = Depends(get_db)):
    key = get_api_key(db, api_key_name)
    if key:
        return { "key": key }
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="API key name not found")


@router.patch("/{api_key_name}", tags=tags, response_model=ApiKeyName)
def api_key_update_by_name(api_key_name: str, api_key_update: ApiKeyUpdate, db: Session = Depends(get_db)):
    update_api_key_name = update_api_key(db, api_key_name, api_key_update)
    if api_key_name:
        return { "name": update_api_key_name }
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="API key name not found")
    
    
@router.delete("/{api_key_name}", tags=tags, response_model=ApiKeyOnly)
def api_key_delete_by_name(api_key_name: str, db: Session = Depends(get_db)):
    delete_api_key_name = delete_api_key(db, name = api_key_name)
    if delete_api_key_name:
        return { "key": delete_api_key_name }
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="API key name not found")