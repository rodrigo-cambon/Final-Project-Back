module.exports = (sequelize, Model, DataTypes) => {
  class Role extends Model {}

  Role.init(
    {
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      code: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "role",
    }
  );

  return Role;
};
