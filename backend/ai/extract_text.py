import os
import fitz  # PyMuPDF
import re
from flask import Flask, request, jsonify

app = Flask(__name__)

UPLOAD_FOLDER = "../uploads"
STORIES_FOLDER = "../stories"

def extract_chapters(pdf_path, book_name):
    os.makedirs(f"{STORIES_FOLDER}/{book_name}", exist_ok=True)
    
    with fitz.open(pdf_path) as doc:
        text = "\n".join([page.get_text("text") for page in doc])
    
    chapters = re.split(r"(Chapter \d+)", text, flags=re.IGNORECASE)
    
    if len(chapters) < 3:
        file_path = f"{STORIES_FOLDER}/{book_name}/full_text.txt"
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(text)
        return {"message": "No chapters detected, full text saved.", "file": file_path}

    stored_chapters = []
    for i in range(1, len(chapters), 2):
        chapter_title = chapters[i].strip()
        chapter_content = chapters[i + 1].strip()
        chapter_filename = f"{STORIES_FOLDER}/{book_name}/{chapter_title}.txt"
        
        with open(chapter_filename, "w", encoding="utf-8") as f:
            f.write(chapter_content)
        
        stored_chapters.append(chapter_filename)

    return {"message": "Chapters extracted successfully", "files": stored_chapters}

@app.route("/extract", methods=["POST"])
def extract_text():
    data = request.json
    filename = data.get("filename")
    
    if not filename:
        return jsonify({"error": "Filename is required"}), 400
    
    pdf_path = os.path.join(UPLOAD_FOLDER, filename)
    if not os.path.exists(pdf_path):
        return jsonify({"error": "File not found"}), 404
    
    book_name = filename.rsplit(".", 1)[0]
    response = extract_chapters(pdf_path, book_name)
    return jsonify(response)

if __name__ == "__main__":
    app.run(port=5001, debug=True)
