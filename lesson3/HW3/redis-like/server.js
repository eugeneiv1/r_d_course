const http = require('node:http');
const store = new Map();

function jsonResponse(json, res) { res.end(JSON.stringify(json)); }

http.createServer((req, res) => {
    const path = new URL(req.url, 'http://x');
    if (req.method === 'GET' && path.pathname === '/get') {
        return jsonResponse({ value: store.get(path.searchParams.get('key')) ?? null }, res);
    }
    if (req.method === 'POST' && path.pathname === '/set') {
        let body = '';
        req.on('data', chunk => (body += chunk));
        req.on('end', () => {
            const { key, value } = JSON.parse(body);
            store.set(key, value);
            jsonResponse({ ok: true }, res);
        });
        return;
    }
    res.statusCode = 404;
    res.end('Not found');
}).listen(4000, () => console.log('redis-like :4000'));