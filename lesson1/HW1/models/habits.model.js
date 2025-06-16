import * as fs from "node:fs/promises";
import path from "path";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.join(__dirname, '../db.json');

const read = async () => {
    return JSON.parse(await fs.readFile(filePath, 'utf-8'));
}

const write = async (data) => {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

const getAllHabits = async () => {
    return await read();
}

const getHabitById = async (habitId) => {
    const db = await read();
    const habit = db.find(habit => habit.id === habitId);

    if(!habit) return false;

    return habit;
}

const createHabit = async (data) => {
    const db = await read();
    const habit = {id: Date.now().toString(), ...data};

    await write([...db, habit]);

    return habit
}

const deleteHabit = async (habitId) => {
    const db = await read();
    const newHabitList = db.filter(habit => habit.id !== habitId);
    if(newHabitList.length === db.length) return false;

    await write(newHabitList);

    return true;
}

const updateHabit = async (habitId, updateData) => {
    const db = await read();
    const targetHabitIndex = db.findIndex(habit => habit.id === habitId)
    if (targetHabitIndex === -1) return false;
    db[targetHabitIndex] = {...db[targetHabitIndex], ...updateData};

    await write(db);

    return true
}

export {
    getAllHabits,
    getHabitById,
    createHabit,
    deleteHabit,
    updateHabit
}
