module.exports = (sequelize, Model, DataTypes) => {
  class Product extends Model {}

  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      popular: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "product",
    }
  );

  return Product;
};
