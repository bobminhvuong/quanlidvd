module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define('contact', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        title: DataTypes.STRING,
        userFriendId: DataTypes.INTEGER,
        relation: DataTypes.STRING
    },
        {
            freezeTableName: true,
        }
    );

    Contact.associate = (models) => {
        Contact.belongsTo(models.user);
    };

    return Contact;
}