const express = require("express");
const { Router } = express;
const { getProductsFromFaker, getMessagesFromFaker } = require("../helpers");

const router = Router();

router.get("/", (req, res) => {
  res.render("form");
});

router.get("/api/productos-test", (req, res) => {
  const products = getProductsFromFaker(5);
  console.log(products);
  res.json(products);
});

router.get("/api/messages-test", (req, res) => {
  const messages = getMessagesFromFaker(5);
  console.log(messages);
  res.json(messages);
});

module.exports = router;
