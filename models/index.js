const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE, // Ej: hack_academy_db
  process.env.DB_USERNAME, // Ej: root
  process.env.DB_PASSWORD, // Ej: root
  {
    host: process.env.DB_HOST, // Ej: 127.0.0.1
    dialect: process.env.DB_CONNECTION, // Ej: mysql
    dialectModule: require("pg"),
    logging: false, // Para que no aparezcan mensajes en consola.
  }
);
const Category = require("./Category")(sequelize, Model, DataTypes);
const Product = require("./Product")(sequelize, Model, DataTypes);
const Role = require("./Role")(sequelize, Model, DataTypes);
const User = require("./User")(sequelize, Model, DataTypes);
const Order = require("./Order")(sequelize, Model, DataTypes);
Role.hasMany(User);
User.belongsTo(Role);

User.hasMany(Order);
Order.belongsTo(User);

Product.belongsTo(Category);
Category.hasMany(Product);

const OrderProduct = sequelize.define("OrderProduct", {
  quantity: {
    type: DataTypes.INTEGER,
  },
  price: {
    type: DataTypes.DECIMAL,
  },
});
Order.belongsToMany(
  Product,
  {
    through: OrderProduct,
  },
  { onDelete: "cascade", foreignKey: { allowNull: false } }
);
Product.belongsToMany(
  Order,
  {
    through: OrderProduct,
  },
  { onDelete: "cascade", foreignKey: { allowNull: false } }
);

module.exports = {
  sequelize,
  Role,
  User,
  Category,
  Product,
  Order,
  OrderProduct,
};
