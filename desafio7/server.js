const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const handlebars = require("express-handlebars");
const router = require("./routes/router");
const PORT = 8080;
const TableGenerator = require("./classes/TableGenerator");
const productsConfig = require("./config/mariaDBConfig");
const messagesConfig = require("./config/sqlite3Config");
const { productsColumns, messageColumns } = require("./constants/columns");

const products = new TableGenerator(
  productsConfig,
  "productos",
  productsColumns
);
let productsSelected = [];
products.selectAllData().then((prod) => {
  productsSelected = prod;
});

const messages = new TableGenerator(messagesConfig, "mensajes", messageColumns);
let messagesSelected = [];
messages.selectAllData().then((msg) => (messagesSelected = msg));

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

//const messagesInstance = new Messages();

io.on("connection", (socket) => {
  socket.on("add-product", (product) => {
    console.log("producto cargado");
    products.uploadProduct(product);
    const allProducts = products.getAllProducts();
    io.sockets.emit("show-all-products", allProducts);
  });

  socket.emit("show-all-messages", messagesSelected);

  socket.on("add-message", (message) => {
    messages.insertValues(message);
    messagesSelected = [...messagesSelected, message];
    console.log("nuevo mensaje recibido");
    io.sockets.emit("show-all-messages", messagesSelected);
  });
});

httpServer.listen(PORT);
