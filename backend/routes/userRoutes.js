import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users;");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new user
router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;
    const { rows } = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *;",
      [name, email]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
