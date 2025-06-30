import {extendZodWithOpenApi, OpenAPIRegistry} from '@asteasolutions/zod-to-openapi';
import zod from 'zod';

extendZodWithOpenApi(zod);

globalThis.registry ??= new OpenAPIRegistry();

export const registry = globalThis.registry;