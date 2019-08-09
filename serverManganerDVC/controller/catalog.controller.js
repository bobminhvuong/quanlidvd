
const db = require("./../models");

module.exports = {
    upsert: upsert,
    getAll: getAll,
    getById: getById,
    upsert: upsert,
    deleteCatalog: deleteCatalog
}

async function deleteCatalog(req, res) {
    try {
        var result = await db.catalog.destroy({ where: { id: req.params.id } });
        return result == 1 ? res.send({ msg: 'deleted catalog' }) : res.status(500).send({ msg: 'an error has occured trying to delete the catalog object' });

    } catch (error) {
        res.status(500).send({ msg: 'an error has occured trying to delete the catalog object' })
    }
}

async function upsert(req, res) {
    var catalog = req.body;

    try {
        if (catalog.id) {
            var result = await db.catalog.update(catalog, { where: { id: catalog.id } })
            const curUser = await db.catalog.findOne({ where: { id: catalog.id } });
            return res.send(curUser);
        } else {
            var us = await db.catalog.create(catalog)
            if (us) res.send(us);
        }
    } catch (error) {
        res.status(500).send({ msg: 'an error has occured trying to create or update the catalog object' })
    }
}
async function getById(req, res) {
    try {
        var catalog = await db.catalog.findOne({ where: { id: req.params.id } })
        res.send(catalog ? catalog : {});

    } catch (error) {
        res.status(500).send({ msg: 'an error has occured trying to get the catalog object' })
    }
}

function getAll(req, res) {

    try {
        var query = req.query;
        if (query.filter) query.filter = JSON.parse(query.filter.replace('.$.', '%').replace('.$.', '%'));
        db.catalog.findAndCountAll(query.filter).then(response => {
            
            res.send(response)
        }, err => {
            res.status(500).send(err.msg);
        })
    } catch (error) {
        res.status(400).send({ msg: 'Wrong syntax input!' });
    }


}
