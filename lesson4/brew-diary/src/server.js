import {createApp} from "./app.js";
import * as http from "node:http";
import {config} from "./config/index.js";

const app = createApp();
const server = http.createServer(app);

server.listen(config.port, () => console.log(`${config.env} API ready on ${config.baseUrl}`));

function shutDown() {
    console.log('Gracefully shutdown');
    server.close(() => {
        console.log('Closed connections');
        process.exit(0);
    });

    setTimeout(() => process.exit(1), 10_000).unref();
}

process.on('SIGTERM', shutDown)
process.on('SIGINT', shutDown)