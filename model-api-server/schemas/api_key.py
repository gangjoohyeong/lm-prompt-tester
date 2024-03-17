from datetime import datetime
from pydantic import BaseModel, validator

class insertApiKey(BaseModel):
    name: str
    key: str