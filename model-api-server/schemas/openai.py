from pydantic import BaseModel


class OpenAiGenerate(BaseModel):
    model: str = "gpt-3.5-turbo"
    system_message: str = "You are a helpful assistant."
    user_message: str
    max_tokens: int = 2048
    top_p: float = 1.0 # 0.0 ~ 1.0
    frequency_penalty: float = 0.0 # -2.0 ~ 2.0
    presence_penalty: float = 0.0  # -2.0 ~ 2.0
    temperature: float = 0.0 # 0.0 ~ 1.0
    
    
    
    