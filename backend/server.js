import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import path from "path";
import axios from "axios";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const uploadsDir = path.join(process.cwd(), "uploads");
const storiesDir = path.join(process.cwd(), "stories");

if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
if (!fs.existsSync(storiesDir)) fs.mkdirSync(storiesDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// 📌 1️⃣ Upload PDF & Extract Chapters
app.post("/api/upload", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "❌ No file uploaded" });

  try {
    const filename = req.file.filename;
    console.log(`📂 Upload received: ${filename}`);

    // Send request to Python AI for chapter extraction
    const response = await axios.post("http://localhost:5001/extract", { filename });

    res.json({ message: "✅ Upload & Processing Complete", filename, chapters: response.data.files });
  } catch (error) {
    console.error("❌ Error processing file:", error);
    res.status(500).json({ message: "❌ Failed to extract text", error: error.message });
  }
});

// 📌 2️⃣ List Uploaded PDFs
app.get("/api/files", (req, res) => {
  try {
    const files = fs.readdirSync(uploadsDir).filter(file => file.endsWith(".pdf"));
    res.json({ files });
  } catch (error) {
    res.status(500).json({ message: "❌ Error reading files", error: error.message });
  }
});

// 📌 3️⃣ List Chapters of a Book
app.get("/api/chapters/:bookName", (req, res) => {
  const { bookName } = req.params;
  const bookPath = path.join(storiesDir, bookName);

  if (!fs.existsSync(bookPath)) {
    return res.status(404).json({ message: "❌ Book not found" });
  }

  const chapters = fs.readdirSync(bookPath).filter(file => file.endsWith(".txt"));
  res.json({ message: "✅ Chapters found", chapters });
});

// 📌 4️⃣ Fetch Chapter Content
app.get("/api/chapter/:bookName/:chapter", (req, res) => {
  const { bookName, chapter } = req.params;
  const chapterPath = path.join(storiesDir, bookName, chapter);

  if (!fs.existsSync(chapterPath)) {
    return res.status(404).json({ message: "❌ Chapter not found" });
  }

  const text = fs.readFileSync(chapterPath, "utf-8");
  res.json({ message: "✅ Chapter Loaded", text });
});

// 📌 5️⃣ AI Narration (DeepSeek)
app.post("/api/narrate", async (req, res) => {
  const { bookName, chapter } = req.body;
  const chapterPath = path.join(storiesDir, bookName, chapter);

  if (!fs.existsSync(chapterPath)) {
    return res.status(404).json({ message: "❌ Chapter not found" });
  }

  const text = fs.readFileSync(chapterPath, "utf-8");

  try {
    const response = await axios.post("https://api.deepseek.com/v1/generate", {
      prompt: `Narrate this text dynamically: ${text}`,
      model: "deepseek-r1",
      temperature: 0.7
    });

    res.json({ narration: response.data.text });
  } catch (error) {
    console.error("DeepSeek API error:", error);
    res.status(500).json({ message: "❌ AI Processing Failed", error: error.message });
  }
});

// 📌 6️⃣ AI Question Answering (DeepSeek)
app.post("/api/ask", async (req, res) => {
  const { bookName, chapter, question } = req.body;
  const chapterPath = path.join(storiesDir, bookName, chapter);

  if (!fs.existsSync(chapterPath)) {
    return res.status(404).json({ message: "❌ Chapter not found" });
  }

  const text = fs.readFileSync(chapterPath, "utf-8");

  try {
    const response = await axios.post("https://api.deepseek.com/v1/generate", {
      prompt: `Based on this story text:\n${text}\nAnswer: ${question}`,
      model: "deepseek-r1",
      temperature: 0.5
    });

    res.json({ answer: response.data.text });
  } catch (error) {
    console.error("DeepSeek API error:", error);
    res.status(500).json({ message: "❌ AI Processing Failed", error: error.message });
  }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
