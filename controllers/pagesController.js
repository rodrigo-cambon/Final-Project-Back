const { Product } = require("../models");
const slugify = require("slugify");
const jwt = require("jsonwebtoken");
const { User, Category, Order } = require("../models");
const { uuid } = require("uuidv4");
// Otros handlers...
// ...
module.exports = {
  allProducts: async (req, res) => {
    const products = await Product.findAll({ order: [["updatedAt", "DESC"]] });
    res.json({ products });
  },
  newProducts: async (req, res) => {
    const products = await Product.findAndCountAll({
      order: [["createdAt", "DESC"]],
      limit: 5,
    });
    res.json({ products });
  },
  popularProducts: async (req, res) => {
    const products = await Product.findAll(
      { where: { popular: 1 } },
      { order: [["createdAt", "DESC"]] }
    );
    res.json({ products });
  },
  showProduct: async (req, res) => {
    const product = await Product.findOne({
      where: { slug: req.params.product },
      include: Category,
    });
    res.json({ product });
  },
  showCategory: async (req, res) => {
    const category = await Category.findByPk(req.params.categoryId);
    const products = await Product.findAll({
      where: { categoryId: req.params.categoryId },
      order: [["createdAt", "DESC"]],
    });
    res.json({ products, category });
  },
  showCategories: async (req, res) => {
    const categories = await Category.findAll();
    res.json({ categories });
  },
  register: async (req, res) => {
    const { firstname, lastname, email, password, username } = req.body;
    const [user, created] = await User.findOrCreate({
      where: {
        email: email,
      },
      defaults: {
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        password: password,
        slug: slugify(username, "_"),
        roleId: 1,
      },
    });
    if (!created) {
      const error = "Incorrect Credentials";
      res.json({
        error: error,
      });
    } else {
      user.token = jwt.sign(
        { sub: { username: username, id: user.id } },
        "chayanne"
      );
      res.json(user);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!(email && password)) {
        res.status(400).send("All inputs are required");
      }
      const user = await User.findOne({ where: { email: email } });
      if (!(await user.validPassword(password))) {
        const error = "Incorrect Credentials";
        res.json({
          error: error,
        });
      } else {
        user.token = jwt.sign(
          { sub: { username: req.body.email, id: user.id } },
          "chayanne"
        );
        res.json(user);
      }
    } catch (err) {
      console.log(err);
    }
  },
  order: async (req, res) => {
    let error = false;
    const order = await Order.create({
      code: uuid(),
      totalPrice: 0,
      state: "paid",
      userId: req.body.user,
      address: req.body.address,
      paymentMethod: req.body.payment,
    });
    req.body.products.forEach(async (product) => {
      if (product.quantity < 1) {
        error = true;
      } else {
        let productToAdd = await Product.findByPk(product.id);
        productToAdd.stock = productToAdd.stock - product.quantity;
        await productToAdd.save();
        await order.addProduct(productToAdd, {
          through: {
            quantity: product.quantity,
            price: product.price * product.quantity,
          },
        });
      }
      if (error) {
        await order.destroy();
      }
    });

    if (!error) {
      order.totalPrice = req.body.price;
      await order.save();
      res.json(order);
    }
  },
  showOrders: async (req, res) => {
    const user = await User.findOne({ where: { slug: req.params.slug } });
    const orders = await Order.findAll({ where: { UserId: user.id } });
    res.json({ orders });
  },
};
