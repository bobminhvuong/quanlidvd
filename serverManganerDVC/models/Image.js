module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('image', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        url: DataTypes.STRING,
        size: DataTypes.STRING
    },
        {
            freezeTableName: true,
        }
    );

    // Image.associate = (models) => {
    //     Image.belongsTo(models.user);
    //     Image.belongsTo(models.dvd);
    // };

    return Image;
}