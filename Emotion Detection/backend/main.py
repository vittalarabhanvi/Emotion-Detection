import test

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

class Text(BaseModel):
    text: str

app = FastAPI()

origins = [
    "http://localhost:63342",
    "http://127.0.0.1:8000",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)

@app.get("/")
async def index():
    return {"message": test.predict_sentiment("I am sad")}

@app.post("/get_sentiment")
def get_sentiment(text: Text):
    return {"message": test.predict_sentiment(text.text)}

