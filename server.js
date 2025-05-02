const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const COUNTER_FILE = 'counter.json';

app.use(cors());
app.use(express.json());

// Initialize counter file if not exists
if (!fs.existsSync(COUNTER_FILE)) {
    fs.writeFileSync(COUNTER_FILE, JSON.stringify({ visits: 0 }));
}

// POST: Increment counter
app.post('/api/visits', (req, res) => {
    const data = JSON.parse(fs.readFileSync(COUNTER_FILE));
    data.visits += 1;
    fs.writeFileSync(COUNTER_FILE, JSON.stringify(data));
    res.json({ visits: data.visits });
});

// GET: Retrieve counter
app.get('/api/visits', (req, res) => {
    const data = JSON.parse(fs.readFileSync(COUNTER_FILE));
    res.json({ visits: data.visits });
});

app.listen(PORT, () => {
    console.log(`Visit tracker running at http://localhost:${PORT}`);
});
