import {
    getUserById,
    updateUser,
    deleteUser
} from '../../../services/users.service.js';
import { parseBody } from '../../../utils/parse-body.js';

export const GET = async (req, res) => {
    const id = req.url.split('/').pop();
    const user = await getUserById(id);

    if (!user) {
        res.writeHead(404);
        return res.end('User not found');
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
}

export const PUT = async (req, res) => {
    const id = req.url.split('/').pop();
    const data = await parseBody(req);
    const user = await updateUser(id, data);

    if (!user) {
        res.writeHead(404);
        return res.end('User not found');
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
}

export const DELETE = async (req, res) => {
    const id = req.url.split('/').pop();
    const deleted = await deleteUser(id);

    if (!deleted) {
        res.writeHead(404);
        return res.end('User not found');
    }

    res.writeHead(204);
    res.end();
}
