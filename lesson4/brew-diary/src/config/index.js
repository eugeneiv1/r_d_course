import zod from "zod";
import dotenv from 'dotenv';
dotenv.config();

const numberStringSchema = (def) => zod.coerce.number().default(def).transform(String);

const DEFAULT_PORT = 3000;
const DEFAULT_ENV = 'development';

const schema = zod.object({
    PORT: numberStringSchema(DEFAULT_PORT),
    NODE_ENV: zod.enum(['development', 'production', 'test']).default(DEFAULT_ENV)
})

const parsed = schema.parse(process.env);

export const config = {
    port: parsed.PORT,
    env: parsed.NODE_ENV,
    baseUrl: `http://localhost:${parsed.PORT}`,
    appName: 'Brews dairy',
}