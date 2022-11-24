const express = require("express");
const router = require("./routes/products");
const PORT = 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use("/", router);

app.listen(PORT);
