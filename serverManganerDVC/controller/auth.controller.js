const db = require('./../models');
var crypto = require('./../utils/crypto');
var jwt = require('./../utils/jwt');

module.exports = {
    login: login
}

async function login(req, res) {
    try {
        var user = req.body;
        const userModel = await db.user.findOne({ where: { email: user.email } });
        if (!userModel) return res.send({ message: 'invalid email!' });

        // var pass = crypto.hashWithSalt(user.password, userModel.dataValues.salt);

        if (userModel.dataValues.password === user.password) {
            jwt.sign(userModel.dataValues, function (err, token) {
                if (!err) {
                    res.send({
                        token: token
                    })
                }
            });
        } else {
            res.send({
                message: 'invalid password!'
            })
        }

    } catch (error) {
        res.status(500).send({
            msg: 'an error has occured trying to login'
        })
    }
}
