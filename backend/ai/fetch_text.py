import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

STORIES_DIR = "../stories"

class FileRequest(BaseModel):
    filename: str

@app.post("/extract")
def get_extracted_text(req: FileRequest):
    book_name = req.filename.rsplit(".", 1)[0]  # Remove .pdf extension
    text_file = os.path.join(STORIES_DIR, book_name, "full_text.txt")

    if not os.path.exists(text_file):
        raise HTTPException(status_code=404, detail="❌ Extracted text not found")

    with open(text_file, "r", encoding="utf-8") as f:
        content = f.read()

    return {"message": "✅ Extraction complete", "text": content}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5001, reload=True)
