from sqlalchemy import Column, Integer, String, Text, DateTime

from database import Base

class ApiKey(Base):
    __tablename__ = "api_key"

    id = Column(Integer, nullable=False, autoincrement=True, primary_key=True)
    name = Column(String(100), nullable=False)
    key = Column(Text, nullable=False)
    create_date = Column(DateTime, nullable=False)