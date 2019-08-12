const db = require("./../models");

module.exports = {
    saveMessage: saveMessage,
    getMessage: getMessage
}

async function saveMessage(mes) {
    return await db.message.create(mes);
}

async function getMessage(req, res) {
    try {
        var query = req.query;
        db.message.findAndCountAll(query.filter).then(response => {
            res.send(response)
        }, err => {
            res.status(500).send(err.msg);
        })
    } catch (error) {
        res.status(400).send({ msg: 'Wrong syntax input!' });
    }
}
