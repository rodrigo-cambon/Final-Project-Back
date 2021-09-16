const faker = require("faker");
const { Role } = require("../models");
faker.locale = "es";

module.exports = async () => {
  const roles = [];

  await roles.push({
    name: "Customer",
    code: 100,
  });
  await roles.push({
    name: "Admin",
    code: 200,
  });

  await Role.bulkCreate(roles);
  console.log("[Database] Se corrió el seeder de roles.");
};
