import express from "express";
import axios from "axios";

const router = express.Router();

// Get AI narration for a story
router.post("/narrate", async (req, res) => {
  try {
    const { text } = req.body;

    // Call AI API for narration
    const response = await axios.post("http://localhost:8000/narrate", { text });

    res.json({ audio: response.data.audio });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
