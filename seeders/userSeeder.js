const faker = require("faker");
const { User } = require("../models");
faker.locale = "es";
const slugify = require("slugify");
module.exports = async () => {
  const users = [];
  users.push({
    username: "user",
    firstname: "user",
    lastname: "user",
    email: "user@user.com",
    password: "$2a$10$nF.tmM6qNKloOYvpA/WXvOjdODxxGCZ5rRbDadjkaNVkAqv8aFw6C",
    slug: "user",
    roleId: 1,
  });
  users.push({
    username: "admin",
    firstname: "admin",
    lastname: "admin",
    email: "admin@admin.com",
    password: "$2a$10$F32/3c/YRGTJ.n9QwvBlvu9Lp/XkViFxbUBiOXDEr90.X8JUTfbme",
    slug: "admin",
    roleId: 2,
  });
  for (let i = 0; i < 10; i++) {
    const nameGenerator = () => faker.internet.userName();
    const userNameAndSlug = nameGenerator();
    users.push({
      username: userNameAndSlug,
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: "$2a$10$nF.tmM6qNKloOYvpA/WXvOjdODxxGCZ5rRbDadjkaNVkAqv8aFw6C",
      slug: slugify(userNameAndSlug),
      roleId: 1,
    });
  }

  await User.bulkCreate(users);
  console.log("[Database] Se corrió el seeder de user.");
};
