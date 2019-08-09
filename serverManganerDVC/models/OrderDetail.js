module.exports = (sequelize, DataTypes) => {
    const OrderDetail = sequelize.define('orderDetail', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        dateReturn: DataTypes.STRING,
        dateLate: DataTypes.STRING,
        totalPrice: DataTypes.DOUBLE,
        totalPriceLate: DataTypes.DOUBLE,
        price: DataTypes.DOUBLE
    },
        {
            freezeTableName: true,
        }
    );

    OrderDetail.associate = (models) => {
        OrderDetail.belongsTo(models.order);
        OrderDetail.belongsTo(models.dvdDetail)
    };

    return OrderDetail;
}