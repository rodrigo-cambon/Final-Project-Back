const bcrypt = require("bcryptjs");
module.exports = (sequelize, Model, DataTypes) => {
  class User extends Model {
    async validPassword(plaintextPassword) {
      return await bcrypt.compare(plaintextPassword, this.password);
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        Validite: { isEmail: true },
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  User.beforeCreate(async (user, options) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  return User;
};
