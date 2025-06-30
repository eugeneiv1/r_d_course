import {Router} from "express";
import {makeClassInvoker} from "awilix-express";
import zod from 'zod';
import {BrewController} from "../controllers/brew.controller.js";
import {validate} from "../middlewares/validate.js";
import {BrewDTO, QuerySchema} from "../dto/brewDTO.js";
import {validateParams} from "../middlewares/validateParams.js";
import {registry} from '../openapi/registry.js'

const router = Router();
const controller = makeClassInvoker(BrewController);

const paramsSchema = zod.object({
    id: zod.string().describe('User ID')
})

router.get('/brews', validate(QuerySchema, 'query'),controller('getAll'));
registry.registerPath({
    method: 'get',
    path: '/api/brews',
    responses: {
        200: {description: 'List of brews', content: {'application/json': {schema: zod.array(BrewDTO)}}}
    }});

router.get('/brews/:id', validateParams(paramsSchema), controller('getById'));
registry.registerPath({
    method: 'get',
    path: '/api/brews/{id}',
    request: {params: paramsSchema},
    responses: {
        200: {description: 'List of brews', content: {'application/json': {schema: BrewDTO}}},
        404: {description: 'Brew not found'}
    }});


router.post('/brews', validate(BrewDTO), controller('create'));
registry.registerPath({
    method: 'post',
    path: '/api/brews',
    request: {
        body: {
            required: true,
            content: {'application/json': {schema: BrewDTO}}
        }
    },
    responses: {
        201: {description: 'New brew created', content: {'application/json': {schema: BrewDTO}}}
    }})


router.put('/brews/:id', validateParams(paramsSchema), validate(BrewDTO), controller('update'));
registry.registerPath({
    method: 'put',
    path: '/api/brews/{id}',
    request: {
        params: paramsSchema,
        body: {
            required: true,
            content: {'application/json': {schema: BrewDTO}}
        }
    },
    responses: {
        200: {description: 'Brew updated', content: {'application/json': {schema: BrewDTO}}},
        404: {description: 'Brew not found'}
    }})

router.delete('/brews/:id', validateParams(paramsSchema), controller('delete'));
registry.registerPath({
    method: 'delete',
    path: '/api/brews/{id}',
    request: {params: paramsSchema},
    responses: {
        204: {description: 'Brew deleted'},
        404: {description: 'Brew not found'},
    }});

export {router}