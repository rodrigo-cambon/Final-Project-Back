const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controllers/adminController");
const checkJwt = require("express-jwt");

// Rutas del Admin:
// ...
adminRouter.get("/users", adminController.showUsers);
adminRouter.get("/orders", adminController.showOrders);
adminRouter.get("/products", adminController.showProducts);
adminRouter.get("/categories", adminController.showCategories);

adminRouter.use(checkJwt({ secret: "chayanne", algorithms: ["HS256"] }));

adminRouter.delete("/order", adminController.deleteOrder);
adminRouter.delete("/user", adminController.deleteUser);
adminRouter.delete("/product", adminController.deleteProduct);
adminRouter.delete("/category", adminController.deleteCategory);
adminRouter.post("/product", adminController.addProduct);
adminRouter.post("/category", adminController.addCategory);
adminRouter.patch("/order", adminController.updateOrder);
adminRouter.patch("/user", adminController.updateUser);
adminRouter.patch("/product", adminController.updateProduct);
adminRouter.patch("/category", adminController.updateCategory);

module.exports = adminRouter;
