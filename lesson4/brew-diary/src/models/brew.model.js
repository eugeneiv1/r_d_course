import { randomUUID } from 'node:crypto'
export class BrewModel {
    static scope = 'singleton';
    #store = new Map();

    constructor() {
        console.log('Brew model initialized');
    }

    getAll({method, ratingMin}) {
        return [...this.#store.values()].filter((brew) =>
            (!method || brew.method === method) &&
            (!ratingMin || brew.rating >= ratingMin)
        );
    }

    getById(id) {
        return this.#store.get(id) ?? null;
    }

    createBrew(dto) {
        const id = randomUUID();
        const brewAt = new Date().toISOString();
        const brew = {id, brewAt, ...dto};

        this.#store.set(id, brew);

        return brew;
    }

    updateBrew(id, dto) {
        const isExist = this.#store.get(id);

        if (!isExist) return null;

        const updated = { ...isExist, ...dto };
        this.#store.set(id, updated);

        return updated;
    }

    deleteBrew(id) {
        return this.#store.delete(id);
    }
}