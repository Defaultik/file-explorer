import os
import utils
from config import *
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles


app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/assets", StaticFiles(directory="assets"), name="assets")

@app.get("/")
async def draw_gui():
    return FileResponse("index.html", media_type="text/html")


@app.get("/api/get_dir_content")
async def get_dir_content(path: str = ALLOWED_DIR):
    target_path = os.path.abspath(path)
    if not target_path.startswith(ALLOWED_DIR):
        raise HTTPException(status_code=403, detail="Access denied")

    if not os.path.exists(target_path) or not os.path.isdir(target_path):
        raise HTTPException(status_code=404, detail="Directory not found")

    items = []
    for item in os.listdir(target_path):
        item_path = os.path.join(target_path, item)
        items.append({
            "name": item,
            "path": item_path,
            "is_dir": os.path.isdir(item_path),
            "size": utils.calculate_size(os.path.getsize(item_path)) if os.path.isfile(item_path) else None
        })

    items.sort(key=lambda x: (not x["is_dir"], x["name"].lower()))

    return {"current_path": target_path, "items": items}

@app.get("/api/open_file")
async def open_file(path: str):
    target_path = os.path.abspath(path)

    if not target_path.startswith(ALLOWED_DIR):
        raise HTTPException(status_code=403, detail="Access denied")

    if not os.path.exists(target_path) or not os.path.isfile(target_path):
        raise HTTPException(status_code=404, detail="File not found")

    ext = os.path.splitext(target_path)[1].lower()
    media_type = "text/plain" if ext in utils.TEXT_EXTENSIONS else None
    
    return FileResponse(target_path, media_type=media_type)