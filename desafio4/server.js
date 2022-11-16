const express = require('express')
const router = require('./routes/products.js')

const app = express();

const PORT = 8080;
const baseUrl = '/api/productos';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(baseUrl, router);
app.use('/static', express.static(__dirname + '/public'))

const server = app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${server.address().port}`))
server.on('error', error => console.log(`Error en servidor ${error}`));