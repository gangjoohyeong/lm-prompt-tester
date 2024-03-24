from pydantic import BaseModel

class OpenAiHistory(BaseModel):
    model: str
    system_message: str
    user_message: str
    max_tokens: int
    top_p: float
    frequency_penalty: float
    presence_penalty: float
    temperature: float
    response_model: str
    completion_tokens: int
    prompt_tokens: int
    total_tokens: int
    
class AnthropicHistory(BaseModel):
    model: str
    system_message: str
    user_message: str
    max_tokens: int
    top_p: float
    temperature: float
    input_tokens: int
    output_tokens: int
    
class HistoryId(BaseModel):
    id: int