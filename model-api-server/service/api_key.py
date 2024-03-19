from sqlalchemy.orm import Session
from schemas.api_key import ApiKeyInsert, ApiKeyUpdate
from models import ApiKey
from datetime import datetime


def get_all_api_keys(db: Session):
    api_keys = db.query(ApiKey).all()
    if api_keys:
        return api_keys
    else:
        return None

def insert_api_key(db: Session, api_key: ApiKeyInsert):
    db_api_key = ApiKey(name=api_key.name, key=api_key.key, create_date=datetime.now())
    db.add(db_api_key)
    db.commit()
    
    return db_api_key.key

def get_api_key(db: Session, name: str):
    db_api_key = db.query(ApiKey).filter(ApiKey.name == name).first()
    if db_api_key:
        return db_api_key.key
    else:
        return None

def update_api_key(db: Session, api_key_name: str, api_key_update: ApiKeyUpdate):
    db_api_key = db.query(ApiKey).filter(ApiKey.name == api_key_name).first()
    if db_api_key:
        db_api_key.key = api_key_update.new_key
        db_api_key.create_date = datetime.now()
        db.commit()
        return db_api_key.name
    else:
        return None
        
def delete_api_key(db: Session, name: str):
    db_api_key = db.query(ApiKey).filter(ApiKey.name == name).first()
    if db_api_key:
        db.delete(db_api_key)
        db.commit()
        return db_api_key.name
    else:
        return None

