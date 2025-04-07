from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import subprocess
import os

app = FastAPI()

STORIES_DIR = os.path.join(os.getcwd(), "stories")
if not os.path.exists(STORIES_DIR):
    os.makedirs(STORIES_DIR)

class PDFRequest(BaseModel):
    filename: str

@app.get("/")
def read_root():
    return {"message": "AI service is running!"}

@app.post("/extract")
def extract_text(request: PDFRequest):
    pdf_path = os.path.join(os.getcwd(), "uploads", request.filename)

    if not os.path.exists(pdf_path):
        raise HTTPException(status_code=404, detail="❌ PDF file not found")

    try:
        # Call the extract_text.py script
        subprocess.run(["python", "extract_text.py", pdf_path], check=True)

        book_name = os.path.splitext(request.filename)[0]
        book_dir = os.path.join(STORIES_DIR, book_name)
        chapters = os.listdir(book_dir) if os.path.exists(book_dir) else []

        return {"message": "✅ Extraction complete", "files": chapters}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"❌ Extraction failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=5001)
