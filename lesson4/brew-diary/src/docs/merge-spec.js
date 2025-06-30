export function mergeSpecs(target, source) {
    target.paths = Object.assign({}, target.paths, source.paths);

    target.components ??= {};
    target.components.schemas ??= {};
    if (source.components?.schemas) {
        target.components.schemas = Object.assign({}, target.components.schemas, source.components.schemas);
    }

    return target;
}