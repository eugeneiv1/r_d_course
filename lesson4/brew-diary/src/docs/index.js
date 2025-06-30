import {mergeSpecs} from "./merge-spec.js";
import {jsdocSpec} from "./swagger.js";
import {createZodSpec} from "./openapi.js";

export const generateSpecs = () => {
    return mergeSpecs(jsdocSpec, createZodSpec())
}