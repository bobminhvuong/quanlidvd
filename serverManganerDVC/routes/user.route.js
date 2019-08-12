var router = require('express').Router();
var userController = require('./../controller/user.controller');

module.exports = function () {
    router.post('/', userController.upsert);
    router.get('/contact/:id',userController.getContact)
    router.get('/:id', userController.getUserById);
    router.put('/:id', userController.upsert);
    router.delete('/:id', userController.deleteUser);
    router.get('/', userController.getAllUser);
   
    return router;
}