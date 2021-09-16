const express = require("express");
const publicRouter = express.Router();
const pagesController = require("../controllers/pagesController");
const checkJwt = require("express-jwt");
// Rutas del Públicas:
// ...
publicRouter.get("/all-products", pagesController.allProducts);
publicRouter.get("/new-products", pagesController.newProducts);
publicRouter.get("/popular-products", pagesController.popularProducts);
publicRouter.get("/categories", pagesController.showCategories);
publicRouter.post("/register", pagesController.register);
publicRouter.post("/token", pagesController.login);
publicRouter.post(
  "/order",
  checkJwt({ secret: "chayanne", algorithms: ["HS256"] }),
  pagesController.order
);
publicRouter.get("/:product", pagesController.showProduct);
publicRouter.get("/:categoryId/category", pagesController.showCategory);
publicRouter.get("/:slug/orders", pagesController.showOrders);
module.exports = publicRouter;
