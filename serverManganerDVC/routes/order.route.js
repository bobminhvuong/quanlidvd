var router = require('express').Router();
var orderController = require('./../controller/order.controller')

module.exports = function () {
    router.get('/', orderController.getOrder);
    router.post('/', orderController.createOrder);
    router.get('/:id', orderController.getOrderById);

    return router;
}