import * as habitController from '../controllers/habits.controller.js'

const router = async (args) => {
    const [command, ...rest] = args;

    const argMap = rest.reduce((acc, arg, i) => {
        if (arg.startsWith('--')) acc[arg.slice(2)] = rest[i + 1];
        return acc;
    }, {});

    switch (command) {
        case 'add':
            await habitController.add(argMap);
            break;
        case 'list':
            await habitController.list();
            break;
        case 'done':
            await habitController.done(argMap);
            break;
        case 'stats':
            await habitController.stats();
            break;
        case 'delete':
            await habitController.deleteHabit(argMap);
            break;
        case 'update':
            await habitController.update(argMap);
            break;
        default:
            console.log('Unknown command');
    }
};

export default router;
