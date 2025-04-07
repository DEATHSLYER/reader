import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const storiesDir = path.join(process.cwd(), "stories");

router.get("/chapters/:bookName", (req, res) => {
  const { bookName } = req.params;
  const bookPath = path.join(storiesDir, bookName);

  if (!fs.existsSync(bookPath)) {
    return res.status(404).json({ message: "❌ Book not found" });
  }

  const chapters = fs.readdirSync(bookPath).filter(file => file.endsWith(".txt"));
  res.json({ message: "✅ Chapters found", chapters });
});

router.get("/chapter/:bookName/:chapter", (req, res) => {
  const { bookName, chapter } = req.params;
  const chapterPath = path.join(storiesDir, bookName, chapter);

  if (!fs.existsSync(chapterPath)) {
    return res.status(404).json({ message: "❌ Chapter not found" });
  }

  const text = fs.readFileSync(chapterPath, "utf-8");
  res.json({ message: "✅ Chapter Loaded", text });
});

export default router;
