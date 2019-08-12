const db = require("./../models");
var crypto = require('./../utils/crypto');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var jwt = require('./../utils/jwt');


module.exports = {
    upsert: upsertUser,
    getAllUser: getAllUser,
    getUserById: getUserById,
    updateUser: upsertUser,
    deleteUser: deleteUser,
    getCurrentUser: getCurrentUser,
    getContact: getContact
}

async function getContact(req, res) {
    var id = req.params.id;
    db.contact.findAndCountAll({ where: { userId: id } }).then(r=>{
        if(r){
            res.send(r)
        }else{
            res.send([])
        }
    });
  
}

function getCurrentUser(req, res) {
    if (req.headers.token) {
        jwt.verify(req.headers.token, async function (err, r) {
            if (r) {
                var user = await db.user.findOne({ where: { id: r.id } })
                if (user) {
                    res.send(user);
                } else {
                    res.send({ status: 500, msg: 'Not found user!' })
                }
            } else {
                res.send({ status: 500, msg: 'Not found user!' })
            }
        });
    } else {
        res.send({ status: 500, msg: 'not found token' })
    }
}

async function deleteUser(req, res) {
    try {
        var result = await db.user.destroy({ where: { id: req.params.id } });
        return result == 1 ? res.send({ msg: 'deleted user' }) : res.status(500).send({ msg: 'an error has occured trying to delete the user object' });

    } catch (error) {
        res.status(500).send({ msg: 'an error has occured trying to delete the user object' })
    }
}

async function upsertUser(req, res) {
    var user = req.body;
    user.note = !user.note ? "" : user.note;

    try {
        if (user.id) {
            var result = await db.user.update(user, { where: { id: user.id } })
            const curUser = await db.user.findOne({ where: { id: user.id } });
            return res.send(curUser);
        } else {
            user.salt = crypto.genSalt();
            var us = await db.user.create(user)
            if (us) res.send(us);
        }
    } catch (error) {
        res.status(500).send({ msg: 'an error has occured trying to create or update the user object' })
    }
}
async function getUserById(req, res) {
    try {
        var user = await db.user.findOne({ where: { id: req.params.id } })
        res.send(user ? user : {});

    } catch (error) {
        res.status(500).send({ msg: 'an error has occured trying to get the user object' })
    }
}

function getAllUser(req, res) {

    try {
        var query = req.query;
        if (query.filter) query.filter = JSON.parse(query.filter.replace('.$.', '%').replace('.$.', '%'));
        db.user.findAndCountAll(query.filter).then(response => {
            res.send(response)
        }, err => {
            res.status(500).send(err.msg);
        })
    } catch (error) {
        res.status(400).send({ msg: 'Wrong syntax input!' });
    }

}
