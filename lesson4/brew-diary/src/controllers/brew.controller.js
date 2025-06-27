export class BrewController {
    static scope = 'scoped';

    constructor(brewService) {
        console.log('BrewController initialized');
        this.brewsService = brewService;
    }

    getAll = (req, res) => {
        res.json(this.brewsService.getAll(req.params));
    }

    getById = (req, res) => {
        res.json(this.brewsService.getById(req.params.id));
    }

    create = (req, res) => {
        res.status(201).json(this.brewsService.create(req.body));
    }

    update = (req, res) => {
        res.json(this.brewsService.update(req.params.id, req.body));
    }

    delete = (req, res) => {
        this.brewsService.delete(req.params.id);
        res.status(204).end();
    }
}