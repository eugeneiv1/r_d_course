import * as habitService from '../services/habits.service.js';

const add = async ({ name, freq }) => {
    await habitService.addHabit(name, freq);
};

const list = async () => {
    await habitService.listHabits();
};

const done = async ({ id }) => {
    await habitService.markDone(id);
};

const stats = async () => {
    await habitService.showStats();
};

const deleteHabit = async ({ id }) => {
    await habitService.deleteHabit(id);
};

const update = async ({ id, name, freq }) => {
    await habitService.updateHabit(id, name, freq);
};

export {add, list, done, stats, deleteHabit, update};
