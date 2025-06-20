import http from 'http';
import {resolveRoute} from "./router.js";
import {parse} from "url";

const server = http.createServer(async (req, res) => {
    try {
        const { pathname } = parse(req.url, true);
        const method = req.method;

        const { status, handler } = await resolveRoute(pathname, method);

        switch (status) {
            case 404: {
                res.writeHead(404);
                return res.end('Not Found');
            }
            case 405: {
                res.writeHead(405, { Allow: 'GET, POST, PUT, DELETE' });
                return res.end('Method Not Allowed');

            }
        }

        if (!handler) {
            res.writeHead(404);
            return res.end('Not Found');
        }

        await handler(req, res);
    } catch (e) {
        console.error(e);
        res.writeHead(500);
        res.end('Internal Server Error');
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})