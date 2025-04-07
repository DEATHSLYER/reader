const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/extract", async (req, res) => {
    const { filename } = req.body;

    if (!filename) {
        return res.status(400).json({ error: "Filename is required" });
    }

    try {
        const response = await axios.post("http://localhost:5001/extract", { filename });
        res.json(response.data);
    } catch (error) {
        console.error("Error extracting text:", error);
        res.status(500).json({ error: "Failed to extract text" });
    }
});

module.exports = router;
