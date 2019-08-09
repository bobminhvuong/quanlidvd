
const db = require("./../models");

module.exports = {
    createOrder: createOrder,
    getOrder: getOrder,
    getOrderById: getOrder
}

async function createOrder(req, res) {
    var newOrder = req.body;
    var date = new date();
    var or = {
        date: date.toString(),
        sellPrice: 0,
        clientId: newOrder.client.id
    }
    var order = await db.order.create(or);
    if(order.dataValues){
        newOrder.dvd.forEach(element => {
            db.orderDetail.create({
                dateReturn: newOrder.dateReturn,
                dateLate:'',
                totalPrice: newOrder.totalPrice,
                price: element.price,
                orderId: order.dataValues.id,
                dvdDetailId: element.id
            })
        });
    }
}

async function getOrder() {

}

async function getOrder() {

}

