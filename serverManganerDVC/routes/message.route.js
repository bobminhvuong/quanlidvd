var router = require('express').Router();
var mesCtrl = require('./../controller/message.controller');
module.exports = function () {
    router.get('/', mesCtrl.getMessage);
    return router;
}