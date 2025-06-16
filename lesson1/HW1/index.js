import router from './router/index.js';

const args = process.argv.slice(2);

await router(args);