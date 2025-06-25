import express from 'express';

const app = express();
app.use(express.json());

const REDIS_URL = process.env.REDIS_URL;

app.get('/kv/:key', async (req, res) => {
    const key = req.params.key;
    const response = await fetch(`${REDIS_URL}/get?key=${key}`);
    const data = await response.json();
    res.json(data);
});

app.post('/kv', async (req, res) => {
    const { key, value } = req.body;
    const response = await fetch(`${REDIS_URL}/set`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value }),
    });
    const data = await response.json();
    res.json(data);
});

app.listen(3000, () => console.log('KV-server listening on 3000'));
