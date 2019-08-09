var router = require('express').Router();
var catalogController = require('./../controller/catalog.controller')

module.exports = function () {
    router.post('/', catalogController.upsert);
    router.get('/', catalogController.getAll);
    router.get('/:id', catalogController.getById);
    router.put('/:id', catalogController.upsert);
    router.delete('/:id', catalogController.deleteCatalog);

    return router;
}