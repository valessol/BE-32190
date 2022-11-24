const express = require("express");
const router = require("./routes/products");
const PORT = 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "./views");
app.set("view engine", "pug");

app.use("/", router);

app.listen(PORT);
