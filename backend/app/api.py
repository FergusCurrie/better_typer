"""
Routing through fast api
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uuid
from app.db_connector import add_record

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
async def log(logs: dict) -> dict:
    """
    add_record(["34823348", "thecowwentto", "1700", "1"])
    x = get_records()
    print(x)
    # create_table()
    """

    # todos.append(todo)
    add_record([logs["uuid"], logs["input"], logs["time"], logs["test"]])
    print(logs)
    return {"data": {"Todo added."}}
