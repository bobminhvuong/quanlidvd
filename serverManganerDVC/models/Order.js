module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('order', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date: DataTypes.STRING,
        sellPrice: DataTypes.DOUBLE
    },
        {
            freezeTableName: true,
        }
    );

    Order.associate = (models) => {
        Order.belongsTo(models.client);
        Order.hasMany(models.orderDetail);
    };

    return Order;
}