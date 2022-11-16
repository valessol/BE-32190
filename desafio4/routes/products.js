const express = require('express')
const { Router } = express;
const productos = require('../classes/Products')

const router = Router();

router.get('/', (req, res) => {
  res.send(productos.getAllProducts());
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = productos.getProductById(Number(id))
  res.send(product);
})

router.post('/', (req, res, next) => {
    const producto = req.body;
    const productWithId = productos.uploadProduct(producto);
    res.status(201).send(productWithId);
  
})

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const productoActualizado = req.body;
  const nuevoProducto = productos.updateProduct(Number(id), productoActualizado);
  res.status(200).send(nuevoProducto);
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const respuesta = productos.deleteProduct(Number(id));
  res.status(200).send(respuesta);
})

module.exports = router;
