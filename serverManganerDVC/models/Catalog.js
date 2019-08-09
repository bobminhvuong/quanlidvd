module.exports = (sequelize, DataTypes) => {
    const Catalog = sequelize.define('catalog', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        note: DataTypes.STRING,
    },
        {
            freezeTableName: true,
        }
    );

    Catalog.associate = (models) => {
        Catalog.hasMany(models.dvd);
    };

    return Catalog;
}