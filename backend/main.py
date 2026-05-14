from fastapi import FastAPI
import psutil

app = FastAPI()

@app.get("/status")
def get_status():
    return {
        "cpu": psutil.cpu_percent(),
        "memory": psutil.virtual_memory().percent,
    }
    