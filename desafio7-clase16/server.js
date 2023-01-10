const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const handlebars = require("express-handlebars");
const router = require("./routes/router");
const TableGenerator = require("./classes/TableContainer");
const productOptions = require("./DBconfig/mariaDB");
const messageOptions = require("./DBconfig/sqlite3");
const { productsColumns, messageColumns } = require("./constants/columns");
const PORT = 8080;

const products = new TableGenerator(
  productOptions,
  "productos2",
  productsColumns
);

let productsSelected = [];

const messages = new TableGenerator(
  messageOptions,
  "mensajes3",
  messageColumns
);

let messagesSelected = [];

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.engine("handlebars", handlebars.engine());
app.set("views", "./views");
app.set("view engine", "handlebars");

app.use("/", router);

io.on("connection", async (socket) => {
  await products.selectAllData().then((prod) => (productsSelected = prod));
  await messages.selectAllData().then((msg) => (messagesSelected = msg));

  socket.emit("show-all-products", productsSelected);

  socket.on("add-product", (product) => {
    console.log("producto cargado");
    products.insertValues(product);
    productsSelected = [...productsSelected, product];
    io.sockets.emit("show-all-products", productsSelected);
  });

  socket.emit("show-all-messages", messagesSelected);

  socket.on("add-message", (message) => {
    console.log("mensaje recibido");
    messages.insertValues(message);
    messagesSelected = [...messagesSelected, message];
    io.sockets.emit("show-all-messages", messagesSelected);
  });
});

httpServer.listen(PORT);
