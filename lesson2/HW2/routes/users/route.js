import { getAllUsers, createUser } from '../../services/users.service.js';
import { parseBody } from "../../utils/parse-body.js";

export const GET = async (req, res) => {
    const users = await getAllUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
}

export const POST = async (req, res) => {
    const data = await parseBody(req);
    const user = await createUser(data);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
}
