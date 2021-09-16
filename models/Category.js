module.exports = (sequelize, Model, DataTypes) => {
  class Category extends Model {}

  Category.init(
    {
      name: {
        type: DataTypes.STRING,
      },

      description: {
        type: DataTypes.TEXT,
      },
      img: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "category",
    }
  );

  return Category;
};
