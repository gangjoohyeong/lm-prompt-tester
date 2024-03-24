from sqlalchemy import Column, Integer, String, Text, DateTime, Float

from database import Base

class ApiKey(Base):
    __tablename__ = "api_key"

    id = Column(Integer, nullable=False, autoincrement=True, primary_key=True)
    name = Column(String(100), unique=True, nullable=False)
    key = Column(Text, nullable=False)
    create_date = Column(DateTime, nullable=False)

class History(Base):
    __tablename__ = "history"

    id = Column(Integer, nullable=False, autoincrement=True, primary_key=True)
    model = Column(String(100), nullable=False)
    user_message = Column(Text, nullable=False)
    system_message = Column(Text, nullable=True)
    max_tokens = Column(Integer, nullable=True)
    top_p = Column(Float, nullable=True)
    frequency_penalty = Column(Float, nullable=True)
    presence_penalty = Column(Float, nullable=True)
    temperature = Column(Float, nullable=True)
    create_date = Column(DateTime, nullable=False)
    response_model = Column(Text, nullable=True)
    completion_tokens =  Column(Integer, nullable=True)
    prompt_tokens = Column(Integer, nullable=True)
    total_tokens = Column(Integer, nullable=True)
    input_tokens = Column(Integer, nullable=True)
    output_tokens = Column(Integer, nullable=True)
    
    