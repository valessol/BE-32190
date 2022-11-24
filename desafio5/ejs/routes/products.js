const express = require("express");
const { Router } = express;
const productos = require("../classes/Products");

const router = Router();

router.get("/", (req, res) => {
  res.render("form");
});

router.get("/productos", (req, res) => {
  const items = productos.getAllProducts();
  res.render("products", { items });
});

router.post("/productos", (req, res) => {
  const producto = req.body;
  productos.uploadProduct(producto);
  res.redirect("/");
});

module.exports = router;
