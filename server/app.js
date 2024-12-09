const express = require('express');
const bodyParser = require('body-parser');
const lichessRoutes = require('./routes/lichess');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', lichessRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
