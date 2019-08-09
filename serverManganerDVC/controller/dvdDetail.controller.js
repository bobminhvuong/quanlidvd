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
        var result = await db.dvdDetail.destroy({ where: { id: req.params.id } });
        return result == 1 ? res.send({ msg: 'deleted dvdDetail object' }) : res.status(500).send({ msg: 'an error has occured trying to delete the dvdDetail object' });

    } catch (error) {
        res.status(500).send({ msg: 'an error has occured trying to delete the dvdDetail object' })
    }
}

async function upsert(req, res) {
    var dvdDetail = req.body;
    try {
        if (dvdDetail.id) {
            var result = await db.dvdDetail.update(dvdDetail, { where: { id: dvdDetail.id } })
            const curDvd = await db.dvdDetail.findOne({ where: { id: dvdDetail.id } });
            return res.send(curDvd);
        } else {
            var us = await db.dvdDetail.create(dvdDetail)
            if (us) res.send(us);
        }
    } catch (error) {
        res.status(500).send({ msg: 'an error has occured trying to create or update the dvdDetail object' })
    }
}
async function getById(req, res) {
    try {
        var dvdDetail = await db.dvdDetail.findOne({ where: { id: req.params.id }, include: include })
        res.send(dvdDetail ? dvdDetail : {});

    } catch (error) {
        res.status(500).send({ msg: 'an error has occured trying to get the dvdDetail object' })
    }
}

function getAll(req, res) {

    try {
        var query = req.query.filter;
        if (req.query.filter) query = JSON.parse(query.replace('.$.', '%').replace('.$.', '%'));

        var include = [
            { model: db.dvd, required: true }
        ];
        query = { ...query, ...{ include: include } };

        db.dvdDetail.findAndCountAll(query).then(response => {
            res.send(response)
        }, err => {
            res.status(500).send(err.msg);
        })
    } catch (error) {
        res.status(400).send({ msg: 'Wrong syntax input!' });
    }

}
