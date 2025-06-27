export class BrewService {
    static scope = 'scoped';
    constructor(brewModel) {
        console.log('BrewService initialized');
        this.brewModel = brewModel;
    }

    getAll({method, ratingMin}) {
        return this.brewModel.getAll({method, ratingMin});
    }

    getById(id) {
        const brew = this.brewModel.getById(id);

        if(!brew) throw Object.assign(new Error('Brew not found'), {status: 404});

        return brew;
    }

    create(dto) {
        return this.brewModel.createBrew(dto);
    }

    update(id, dto) {
        const brew = this.brewModel.updateBrew(id, dto);

        if(!brew) throw Object.assign(new Error('Brew not found'), {status: 404});

        return brew;
    }

    delete(id) {
        const isDeleted = this.brewModel.deleteBrew(id);

        if(!isDeleted) throw Object.assign(new Error('Brew not found'), {status: 404});
    }
}