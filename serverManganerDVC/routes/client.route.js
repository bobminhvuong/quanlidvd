var router = require('express').Router();
var clientController = require('./../controller/client.controller')

module.exports = function () {
    router.post('/', clientController.upsert);
    router.get('/', clientController.getAll);
    router.get('/:id', clientController.getById);
    router.put('/:id', clientController.upsert);
    router.delete('/:id', clientController.deleteClient);
    return router;
}