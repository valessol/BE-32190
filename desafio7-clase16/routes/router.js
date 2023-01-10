const express = require("express");
const { Router } = express;
const productos = require("../classes/Products");

const router = Router();

router.get("/", (req, res) => {
  res.render("form");
});

module.exports = router;
