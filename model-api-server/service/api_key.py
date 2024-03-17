from sqlalchemy.orm import Session
from schemas.api_key import insertApiKey
from models import ApiKey
from datetime import datetime


def insert_api_key(db: Session, api_key: insertApiKey):
    
    db_api_key = ApiKey(name=api_key.name, key=api_key.key, create_date=datetime.now())
    db.add(db_api_key)
    db.commit()
    
    return db_api_key.id