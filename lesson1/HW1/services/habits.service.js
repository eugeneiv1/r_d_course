import * as habitModel from '../models/habits.model.js';
import { getTodayOffset } from '../utils/time.js';

const addHabit = async (name, freq) => {
    const newHabit = {
        name,
        freq,
        log: []
    };
    await habitModel.createHabit(newHabit);
    console.log('Habit added');
};

const listHabits = async () => {
    const data = await habitModel.getAllHabits();
    console.table(data.map(h => ({
        ID: h.id,
        Name: h.name,
        Freq: h.freq,
        Done: h.done
    })));
};

const markDone = async (id) => {
    const habit = await habitModel.getHabitById(id);
    if (!habit) return 'Habit with provided id not found';

    const today= getTodayOffset();

    if (!habit.log.includes(today)) habit.log.push(today);

    await habitModel.updateHabit(id, habit);
    console.log('Habit marked as done');
};

const showStats = async () => {
    const data = await habitModel.getAllHabits();
    data.forEach(habit => {
        const days = Array.from({ length: habit.freq === 'monthly' ? 30 : 7 }, (_, i) => getTodayOffset(-i));
        const count = habit.log.filter(d => days.includes(d)).length;
        const percent = (count / days.length * 100).toFixed(1);
        console.log(`${habit.name} (${habit.freq}) — ${percent}%`);
    });
};

const deleteHabit = async (id) => {
    await habitModel.deleteHabit(id);
    console.log('Habit deleted');
};

const updateHabit = async (id, name, freq) => {
    await habitModel.updateHabit(id, {name, freq});
    console.log('Habit updated');
};

export {
    addHabit,
    listHabits,
    markDone,
    showStats,
    deleteHabit,
    updateHabit
};
