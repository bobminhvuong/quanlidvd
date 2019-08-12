var crypto = require('./../utils/crypto');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fullName: DataTypes.STRING,
        dob: DataTypes.STRING,
        gender: DataTypes.STRING,
        address: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        salt: DataTypes.STRING,
        note: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        phoneNumber: DataTypes.STRING,
        role: DataTypes.STRING
    },
        {
            freezeTableName: true,
            hooks: {
                beforeCreate: hashPassword,
                beforeUpdate: hashPassword,
                beforeSave: hashPassword
            }
        }
    );

    User.associate = (models) => {
        User.belongsTo(models.image);
        User.hasMany(models.contact);
    };


    function hashPassword(user, options) {
        // if (!user.changed('password')) {
        //     return
        // }
        // var pass = crypto.hashWithSalt(user.password, user.salt);        
        // return user.setDataValue('password', pass)
    }

    return User;
}