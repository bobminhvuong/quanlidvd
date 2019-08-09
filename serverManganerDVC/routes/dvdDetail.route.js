var router = require('express').Router();
var dvdDetailController = require('./../controller/dvdDetail.controller');

module.exports = function () {
    router.post('/', dvdDetailController.upsert);
    router.get('/', dvdDetailController.getAll);
    router.get('/:id', dvdDetailController.getById);
    router.put('/:id', dvdDetailController.upsert);
    router.delete('/:id', dvdDetailController.deleteDvd);
    return router;
}