module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define('client', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fullName: DataTypes.STRING,
        dob: DataTypes.STRING,
        address: DataTypes.STRING,
        email: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        gender:DataTypes.STRING
    },
        {
            freezeTableName: true,
        }
    );

    Client.associate = (models) => {
        Client.hasMany(models.order);
        Client.belongsTo(models.user);
    };

    return Client;
}