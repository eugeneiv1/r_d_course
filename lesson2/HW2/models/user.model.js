import * as fs from 'node:fs/promises';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.join(__dirname, '../db.json');

const read = async () => {
    return JSON.parse(await fs.readFile(filePath, 'utf-8'));
};

const write = async (data) => {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

const getAllUsers = async () => {
    return await read();
};

const getUserById = async (userId) => {
    const db = await read();
    const user = db.find((user) => user.id === userId);

    if (!user) return false;

    return user;
};

const createUser = async (data) => {
    const db = await read();
    const user = {id: Date.now().toString(), ...data}

    await write([...db, user]);

    return user;
};

const deleteUser = async (userId) => {
  const db = await read();
  const newUsersList = db.filter((user) => user.id !==userId);
  if (newUsersList.length === db.length) return false;

  await write(newUsersList);

  return true;
};

const updateUser = async (userId, updateData) => {
    const db = await read();
    const targetUserIndex = db.findIndex((user) => user.id === userId);

    if (targetUserIndex === -1) return false;
    db[targetUserIndex] = {...db[targetUserIndex], ...updateData};

    await write(db);

    return true;
};

export {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser
};