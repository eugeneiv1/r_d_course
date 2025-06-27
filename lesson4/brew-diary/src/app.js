import express from 'express';
import helmet from "helmet";
import cors from 'cors';
import compression from "compression";
import { rateLimit } from "express-rate-limit";
import { errorHandler } from "./middlewares/errorHandler.js";
import {scopePerRequest} from "awilix-express";
import {container} from "../container.js";
import {router as brewsRouter} from "./routes/brews.routes.js";

export const createApp = () => {
    const app = express();
    const limiter = rateLimit({
        windowMs: 60_000,
        max:10,
        standardHeaders: true,
        legacyHeaders: false,
    });

    app.use(helmet(), cors(), compression());

    app.post('*', limiter);

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.use(scopePerRequest(container));

    app.use('/api', brewsRouter)

    app.use(errorHandler)

    return app;
}

