document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector("chess-board");
    const uploadPGN = document.getElementById("uploadPGN");
    const lichessGame = document.getElementById("lichessGame");
    const importLichessBtn = document.getElementById("importLichess");
    const analyzeBtn = document.getElementById("analyzeBtn");
    const analysisResults = document.getElementById("analysisResults");
    const game = new Chess();

    // Load PGN File
    uploadPGN.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (game.load_pgn(e.target.result)) {
                    board.setPosition(game.fen());
                    analysisResults.innerHTML = "Game loaded. Ready for analysis.";
                } else {
                    analysisResults.innerHTML = "Invalid PGN file.";
                }
            };
            reader.readAsText(file);
        }
    });

    // Import Game from Lichess
    importLichessBtn.addEventListener("click", async () => {
        const lichessLink = lichessGame.value.trim();
        if (!lichessLink) {
            analysisResults.innerHTML = "Please enter a valid Lichess game link.";
            return;
        }

        const response = await fetch(`/api/import-lichess`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: lichessLink }),
        });

        const data = await response.json();
        if (data.success) {
            if (game.load_pgn(data.pgn)) {
                board.setPosition(game.fen());
                analysisResults.innerHTML = "Lichess game imported. Ready for analysis.";
            } else {
                analysisResults.innerHTML = "Failed to load game from Lichess.";
            }
        } else {
            analysisResults.innerHTML = "Error importing game from Lichess.";
        }
    });

    // Analyze Game
    analyzeBtn.addEventListener("click", () => {
        const moves = game.history();
        if (moves.length === 0) {
            analysisResults.innerHTML = "No moves to analyze.";
            return;
        }

        analysisResults.innerHTML = "Analyzing game...";
        analyzeGame(moves);
    });

    // Game Analysis Logic (Uses Stockfish)
    function analyzeGame(moves) {
        const stockfish = new Worker("path/to/stockfish.js");

        stockfish.onmessage = (e) => {
            if (e.data.includes("bestmove")) {
                analysisResults.innerHTML += `<p>${e.data}</p>`;
            }
        };

        moves.forEach((move, index) => {
            stockfish.postMessage(`position startpos moves ${moves.slice(0, index + 1).join(" ")}`);
            stockfish.postMessage("go depth 15");
        });
    }
});
