from fastapi import FastAPI
from api import api_key, openai, anthropic

app = FastAPI()

@app.get("/")
async def hello():
    return {"Hello": "World"}

app.include_router(api_key.router)
app.include_router(openai.router)
app.include_router(anthropic.router)