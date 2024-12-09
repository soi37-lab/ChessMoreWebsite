const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// Import game from Lichess
router.post('/import-lichess', async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ success: false, message: "Game URL is required." });
    }

    const lichessGameId = url.split('/').pop();

    try {
        const response = await fetch(`https://lichess.org/game/export/${lichessGameId}?pgnInJson=true`);
        if (!response.ok) {
            return res.status(404).json({ success: false, message: "Game not found or invalid Lichess link." });
        }

        const gameData = await response.json();
        res.json({ success: true, pgn: gameData.pgn });
    } catch (error) {
        console.error("Error fetching game from Lichess:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});

module.exports = router;
