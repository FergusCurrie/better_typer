"""
Routing through fast api
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uuid

app = FastAPI()

origins = ["http://localhost:3000", "localhost:3000"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your todo list."}


@app.get("/query", tags=["query"])
async def query() -> dict:
    return {
        "target_text": "The quick brown fox jumped over the lazy dog.",
        "uuid": str(uuid.uuid1()),
    }


@app.post("/log", tags=["log"])
async def log(todo: dict) -> dict:
    # todos.append(todo)
    print(todo)
    return {"data": {"Todo added."}}
