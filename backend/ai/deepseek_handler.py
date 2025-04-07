import os
import json
import requests
from dotenv import load_dotenv

load_dotenv()

DEEPSEEK_API_KEY = os.getenv("sk-36cad5a18f15497bbaa35bd9dab932f2")
DEEPSEEK_URL = "https://api.deepseek.com/v1/chat/completions"

HEADERS = {
    "Authorization": f"Bearer {DEEPSEEK_API_KEY}",
    "Content-Type": "application/json"
}

def query_deepseek(prompt):
    """Send a request to DeepSeek AI and return the response."""
    payload = {
        "model": "deepseek-r1",
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 500
    }

    response = requests.post(DEEPSEEK_URL, headers=HEADERS, json=payload)
    return response.json()

def answer_question(book_title, chapter_num, question):
    """Answer a question using DeepSeek AI based on chapter content."""
    chapter_path = f"../stories/{book_title}/Chapter_{chapter_num}.txt"

    if not os.path.exists(chapter_path):
        return json.dumps({"error": "Chapter not found"})

    with open(chapter_path, "r", encoding="utf-8") as f:
        chapter_text = f.read()

    prompt = f"Based on the following chapter, answer: {question}\n\n{chapter_text}"
    response = query_deepseek(prompt)

    return json.dumps({"answer": response['choices'][0]['message']['content']})

if __name__ == "__main__":
    book = "Sample_Book"
    chapter = 1
    question = "What is the main theme of this chapter?"
    print(answer_question(book, chapter, question))
