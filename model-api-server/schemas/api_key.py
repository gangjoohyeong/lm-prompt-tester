from datetime import datetime
from pydantic import BaseModel, validator


class ApiKeyBase(BaseModel):
    id: int
    name: str
    key: str
    create_date: datetime

class ApiKeyOnly(BaseModel):
    key: str
    
class ApiKeyName(BaseModel):
    name: str
    
class ApiKeyInsert(BaseModel):
    name: str
    key: str
    
class ApiKeyUpdate(BaseModel):
    new_key: str