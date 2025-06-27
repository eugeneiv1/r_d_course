import {asClass, createContainer} from "awilix";
import {BrewModel} from "./src/models/brew.model.js";
import {BrewService} from "./src/services/brew.service.js";
import {BrewController} from "./src/controllers/brew.controller.js";
import {objectMap} from "./src/utils/Object.map.js";

const brewModule = {
    brewModel: BrewModel,
    brewService: BrewService,
    brewController: BrewController
}

export const container = createContainer({injectionMode: 'CLASSIC'});
container.register(objectMap(brewModule, value => asClass(value)[value.scope]()));