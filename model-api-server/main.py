from fastapi import FastAPI
from api import api_key, openai, anthropic, history
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_key.router)
app.include_router(openai.router)
app.include_router(anthropic.router)
app.include_router(history.router)