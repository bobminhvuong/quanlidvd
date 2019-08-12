module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('message', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        message: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        userReceiptId: DataTypes.INTEGER
    },
        {
            freezeTableName: true,
        }
    );
    Message.associate = (models) => {
    };
    return Message;
}