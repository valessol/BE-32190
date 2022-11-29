const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const handlebars = require("express-handlebars");
const products = require("./classes/Products");
const Messages = require("./classes/Messages");
const router = require("./routes/router");
const PORT = 8080;

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

const messagesInstance = new Messages();

io.on("connection", (socket) => {
  socket.on("add-product", (product) => {
    console.log("producto cargado");
    products.uploadProduct(product);
    const allProducts = products.getAllProducts();
    io.sockets.emit("show-all-products", allProducts);
  });

  socket.emit("show-all-messages", messagesInstance.readMessages());

  socket.on("add-message", (message) => {
    console.log("mensaje recibido");
    messagesInstance.saveMessages(message);
    const allMessages = messagesInstance.readMessages();
    io.sockets.emit("show-all-messages", allMessages);
  });
});

httpServer.listen(PORT);
