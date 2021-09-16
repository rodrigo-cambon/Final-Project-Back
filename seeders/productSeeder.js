
const { Product } = require("../models");
product = require("./DBdata/product");
module.exports = async () => {
  await Product.bulkCreate(product);
  console.log("[Database] Se corrió el seeder de products.");
};
