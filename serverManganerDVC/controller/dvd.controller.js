const db = require("./../models");

module.exports = {
    upsert: upsert,
    getAll: getAll,
    getById: getById,
    update: upsert,
    deleteDvd: deleteDvd,
}
async function deleteDvd(req, res) {
    try {
        var result = await db.dvd.destroy({ where: { id: req.params.id } });
        return result == 1 ? res.send({ msg: 'deleted dvd' }) : res.status(500).send({ msg: 'an error has occured trying to delete the dvd object' });

    } catch (error) {
        res.status(500).send({ msg: 'an error has occured trying to delete the dvd object' })
    }
}

async function upsert(req, res) {
    var dvd = req.body;
    try {
        if (dvd.id) {
            var result = await db.dvd.update(dvd, { where: { id: dvd.id } })
            const curDvd = await db.dvd.findOne({ where: { id: dvd.id } });
            return res.send(curDvd);
        } else {
            var us = await db.dvd.create(dvd)
            if (us) res.send(us);
        }
    } catch (error) {
        res.status(500).send({ msg: 'an error has occured trying to create or update the dvd object' })
    }
}
async function getById(req, res) {
    try {
        var include = [
            { model: db.catalog, required: true },
            { model: db.image }
        ];

        var dvd = await db.dvd.findOne({ where: { id: req.params.id }, include: include })
        res.send(dvd ? dvd : {});

    } catch (error) {
        res.status(500).send({ msg: 'an error has occured trying to get the dvd object' })
    }
}

function getAll(req, res) {

    try {
        var query = req.query.filter;
        if (req.query.filter) query = JSON.parse(query.replace('.$.', '%').replace('.$.', '%'));
        var include = [
            { model: db.catalog, required: true },
            { model: db.image },
            { model: db.dvdDetail },
        ];
        query = { ...query, ...{ include: include } };
        db.dvd.findAndCountAll(query).then(response => {
            res.send(response)
        }, err => {
            res.status(500).send(err.msg);
        })
    } catch (error) {
        res.status(400).send({ msg: 'Wrong syntax input!' });
    }

}
