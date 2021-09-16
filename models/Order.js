module.exports = (sequelize, Model, DataTypes) => {
  class Order extends Model {}

  Order.init(
    {
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.DECIMAL,
      },
      state: {
        type: DataTypes.STRING,
      },
      paymentMethod: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "order",
    }
  );

  return Order;
};
