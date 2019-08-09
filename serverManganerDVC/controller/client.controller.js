
const db = require("./../models");

module.exports = {
    upsert: upsert,
    getAll: getAll,
    getById: getById,
    upsert: upsert,
    deleteClient: deleteClient
}

async function deleteClient(req, res) {
    try {
        var result = await db.client.destroy({ where: { id: req.params.id } });
        return result == 1 ? res.send({ msg: 'deleted client' }) : res.status(500).send({ msg: 'an error has occured trying to delete the client object' });

    } catch (error) {
        res.status(500).send({ msg: 'an error has occured trying to delete the client object' })
    }
}

async function upsert(req, res) {
    var client = req.body;

    try {
        if (client.id) {
            var result = await db.client.update(client, { where: { id: client.id } })
            const curUser = await db.client.findOne({ where: { id: client.id } });
            return res.send(curUser);
        } else {
            var us = await db.client.create(client)
            if (us) res.send(us);
        }
    } catch (error) {
        res.status(500).send({ msg: 'an error has occured trying to create or update the client object' })
    }
}
async function getById(req, res) {
    try {
        var client = await db.client.findOne({ where: { id: req.params.id } })
        res.send(client ? client : {});

    } catch (error) {
        res.status(500).send({ msg: 'an error has occured trying to get the client object' })
    }
}

function getAll(req, res) {
    try {
        var query = req.query;
        if (query.filter) query.filter = JSON.parse(query.filter.replace('.$.', '%').replace('.$.', '%').replace('.$.', '%').replace('.$.', '%').replace('.$.', '%').replace('.$.', '%'));

        console.log(query.filter);
        
        db.client.findAndCountAll(query.filter).then(response => {
            res.send(response)
        }, err => {
            res.status(500).send(err.msg);
        })
    } catch (error) {
        res.status(400).send({   msg: 'Wrong syntax input!' });
    }

}
