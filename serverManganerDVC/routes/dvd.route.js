var router = require('express').Router();
var dvdController = require('./../controller/dvd.controller');

module.exports = function () {
    router.post('/', dvdController.upsert);
    router.get('/', dvdController.getAll);
    router.get('/:id', dvdController.getById);
    router.put('/:id', dvdController.upsert);
    router.delete('/:id', dvdController.deleteDvd);

    return router;
}