<script>
    document.addEventListener("DOMContentLoaded", () => {
        const board = Chessboard('chessboard-setup', {
            draggable: true, // Allow piece dragging
            dropOffBoard: 'trash', // Allow piece removal
            sparePieces: true // Enable manual setup
        });

        // Attach the board to a global variable for easy access
        window.chessboard = board;

        // Clear the board for manual setup
        document.getElementById('board-setup-submit').addEventListener('click', () => {
            const chess = new Chess(); // Chess.js instance
            const fen = board.fen(); // Get the board position in FEN format
            chess.load(fen); // Load the position into Chess.js

            console.log("Board FEN:", fen); // For debugging
            analyzeGame(fen); // Send the position to the analysis function
        });
    });
</script>
