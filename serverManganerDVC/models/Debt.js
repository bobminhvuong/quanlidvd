module.exports = (sequelize, DataTypes) => {
    const Debt = sequelize.define('debt', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        priceDebt: DataTypes.DOUBLE,
        status: DataTypes.BOOLEAN
    },
        {
            freezeTableName: true,
        }
    );

    Debt.associate = (models) => {
        Debt.belongsTo(models.client);
        Debt.belongsTo(models.orderDetail);
    };

    return Debt;
}