import {Router} from "express";
import {makeClassInvoker} from "awilix-express";
import zod from 'zod';
import {BrewController} from "../controllers/brew.controller.js";
import {validate} from "../middlewares/validate.js";
import {BrewDTO, QuerySchema} from "../dto/brewDTO.js";
import {validateParams} from "../middlewares/validateParams.js";

const router = Router();
const controller = makeClassInvoker(BrewController);

const paramsSchema = zod.object({
    id: zod.string().describe('User ID')
})

router.get('/brews', validate(QuerySchema, 'query'),controller('getAll'));

router.get('/brews/:id', validateParams(paramsSchema), controller('getById'));

router.post('/brews', validate(BrewDTO), controller('create'));

router.put('/brews/:id', validateParams(paramsSchema), validate(BrewDTO), controller('update'));

router.delete('/brews/:id', validateParams(paramsSchema), controller('delete'));

export {router}