import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Get all stories
router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM stories;");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get a single story by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM stories WHERE id = $1;", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Story not found" });
    }

    // ✅ Assume `content` has the full story, split it into chapters
    const chapters = rows[0].content.split("\n\n"); 

    res.json({ title: rows[0].title, chapters });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
