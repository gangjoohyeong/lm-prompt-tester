from pydantic import BaseModel


class AnthropicGenerate(BaseModel):
    model: str = "claude-3-sonnet-20240229"
    system_message: str = "Respond only in Yoda-speak."
    user_message: str
    max_tokens: int = 1024
    top_p: float = 1.0 # 0.0 ~ 1.0
    temperature: float = 1.0 # 0.0 ~ 1.0
    
    
    
    