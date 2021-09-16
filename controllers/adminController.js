const slugify = require("slugify");
const jwt = require("jsonwebtoken");
const { User, Category, Order, Product, OrderProduct } = require("../models");
const { uuid } = require("uuidv4");
const formidable = require("formidable");
const { order } = require("./pagesController");
const { createClient } = require("@supabase/supabase-js");
// Otros handlers...
// ...
module.exports = {
  deleteOrder: async (req, res) => {
    const order = await Order.findByPk(req.body.id);
    await order.destroy();
  },
  deleteUser: async (req, res) => {
    const user = await User.findByPk(req.body.id);
    await user.destroy();
  },
  deleteCategory: async (req, res) => {
    const category = await Category.findByPk(req.body.id);
    await category.destroy();
  },
  deleteProduct: async (req, res) => {
    const product = await Product.findByPk(req.body.id);
    await product.destroy();
  },
  updateOrder: async (req, res) => {
    await Order.update(req.body, {
      where: {
        id: req.body.id,
      },
    });
  },
  updateProduct: async (req, res) => {
    console.log(req.body);
    await Product.update(req.body, {
      where: {
        id: req.body.id,
      },
    });
  },
  updateCategory: async (req, res) => {
    await Category.update(req.body, {
      where: {
        id: req.body.id,
      },
    });
  },
  updateUser: async (req, res) => {
    await User.update(req.body, {
      where: {
        id: req.body.id,
      },
    });
  },
  addProduct: async (req, res) => {
    const form = formidable({
      multiples: true,
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      console.log(fields);
      const path = require("path");
      const fs = require("fs");
      if (files.img.name === "") {
        fs.unlink(files.img.path, () => {});
      }
      const { name, description, price, stock, popular, category } = fields;
      const img = files.img.name;
      const [product, created] = await Product.findOrCreate({
        where: {
          name: name,
        },
        defaults: {
          name: name,
          description: description,
          img: img,
          price: price,
          stock: stock,
          popular: popular,
          slug: slugify(name),
          categoryId: category,
          quantity: 1,
        },
      });
      try {
        const supabase = createClient(
          "https://hrdmxylsfdxhrvmiajpd.supabase.co",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjMwNTAwNDg0LCJleHAiOjE5NDYwNzY0ODR9.EXQ53CO19M7_BzDSDZRI-UPtZDFcI4jV2AO4GcFmQ5c"
        );
        console.log(files.img.name);
        await supabase.storage
          .from("ecommerce")
          .upload(
            `img/${files.img.name}`,
            fs.createReadStream(files.img.path),
            {
              cacheControl: "3600",
              upsert: false,
              contentType: files.img.type,
            }
          );
      } catch (error) {
        console.log(error);
      }
      res.json(product);
    });
  },
  addCategory: async (req, res) => {
    const form = formidable({
      multiples: true,
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      console.log(fields);
      const path = require("path");
      const fs = require("fs");
      if (files.img.name === "") {
        fs.unlink(files.img.path, () => {});
      }
      const { name, description } = fields;
      const img = files.img.name;
      const [category, created] = await Category.findOrCreate({
        where: {
          name: name,
        },
        defaults: {
          name: name,
          description: description,
          img: img,
        },
      });
      try {
        const supabase = createClient(
          "https://hrdmxylsfdxhrvmiajpd.supabase.co",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjMwNTAwNDg0LCJleHAiOjE5NDYwNzY0ODR9.EXQ53CO19M7_BzDSDZRI-UPtZDFcI4jV2AO4GcFmQ5c"
        );
        console.log(files.img.name);
        await supabase.storage
          .from("ecommerce")
          .upload(
            `img/${files.img.name}`,
            fs.createReadStream(files.img.path),
            {
              cacheControl: "3600",
              upsert: false,
              contentType: files.img.type,
            }
          );
      } catch (error) {
        console.log(error);
      }
      res.json(category);
    });
  },
  showProducts: async (req, res) => {
    const products = await Product.findAll();
    res.json({ products });
  },
  showOrders: async (req, res) => {
    const orders = await Order.findAll();
    res.json({ orders });
  },
  showUsers: async (req, res) => {
    const users = await User.findAll();
    res.json({ users });
  },
  showCategories: async (req, res) => {
    const categories = await Category.findAll();
    res.json({ categories });
  },
};
