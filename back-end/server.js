// back-end/server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); // for parsing application/json

const PORT = 5000;

// Example route
app.get('/', (req, res) => {
    res.send('Senate Stock Tracker Backend Running');
});

// Later, you can add API routes here

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
