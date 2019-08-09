var router = require('express').Router();
var auth = require('./../controller/auth.controller');
var userController = require('./../controller/user.controller');

module.exports = function () {
    router.post('/login', auth.login);
    router.get('/currentUser', userController.getCurrentUser)
    return router;
}