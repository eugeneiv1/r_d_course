export const getTodayOffset = (offset = parseInt(process.env.OFFSET || 0, 10)) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return date.toISOString().split('T')[0];
};
