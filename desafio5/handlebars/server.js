const express = require("express");
const handlebars = require("express-handlebars");
const router = require("./routes/products");
const PORT = 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", handlebars.engine());
app.set("views", "./views");
app.set("view engine", "handlebars");

app.use("/", router);

app.listen(PORT);
