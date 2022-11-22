import uvicorn

"""
Entry point for running application backend.
"""

if __name__ == "__main__":
    uvicorn.run("app.api:app", host="0.0.0.0", port=8000, reload=True)
