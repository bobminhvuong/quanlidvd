module.exports = (sequelize, DataTypes) => {
    const DVD = sequelize.define('dvd', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        note: DataTypes.STRING,
        supplier: DataTypes.STRING,
        price: DataTypes.DOUBLE
    },
        {
            freezeTableName: true,
        }
    );

    DVD.associate = (models) => {
        DVD.belongsTo(models.catalog);
        DVD.belongsTo(models.image);
        DVD.hasMany(models.dvdDetail)
    };

    return DVD;
}