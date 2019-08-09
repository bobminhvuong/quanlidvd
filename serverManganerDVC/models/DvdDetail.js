module.exports = (sequelize, DataTypes) => {
    const DVDDetail = sequelize.define('dvdDetail', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        code: DataTypes.STRING,
        status: DataTypes.STRING
    },
        {
            freezeTableName: true,
        }
    );

    DVDDetail.associate = (models) => {
        DVDDetail.belongsTo(models.dvd);
    };

    return DVDDetail;
}