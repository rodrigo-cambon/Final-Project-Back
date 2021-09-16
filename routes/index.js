const publicRoutes = require("./publicRoutes");
const adminRoutes = require("./adminRoutes");

module.exports = (app) => {
  app.use("/admin", adminRoutes);
  app.use(publicRoutes);
};
