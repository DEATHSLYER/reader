import express from "express";
import axios from "axios";
import fs from "fs";
import path from "path";

const router = express.Router();
const deepSeekApiUrl = "https://api.deepseek.com/v1/generate";  // Example URL

router.post("/narrate", async (req, res) => {
  const { bookName, chapter } = req.body;
  const chapterPath = path.join(process.cwd(), "stories", bookName, chapter);

  if (!fs.existsSync(chapterPath)) {
    return res.status(404).json({ message: "❌ Chapter not found" });
  }

  const text = fs.readFileSync(chapterPath, "utf-8");

  try {
    const response = await axios.post(deepSeekApiUrl, {
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

router.post("/ask", async (req, res) => {
  const { bookName, chapter, question } = req.body;
  const chapterPath = path.join(process.cwd(), "stories", bookName, chapter);

  if (!fs.existsSync(chapterPath)) {
    return res.status(404).json({ message: "❌ Chapter not found" });
  }

  const text = fs.readFileSync(chapterPath, "utf-8");

  try {
    const response = await axios.post(deepSeekApiUrl, {
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

export default router;
