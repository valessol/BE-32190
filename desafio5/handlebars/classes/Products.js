class Product {
  constructor() {
    this.products;
  }

  getAllProducts() {
    if (this.products?.length) return this.products;
    else return [];
  }

  getProductById(id) {
    let message;
    if (isNaN(id)) {
      message = "El id es inválido";
    } else if (this.products?.length) {
      const product = this.products.find((producto) => producto.id === id);
      if (product) return product;
    } else message = { error: "producto no encontrado" };
    return message;
  }

  getProductId() {
    let id;
    if (!this.products?.length) {
      id = 1;
    } else {
      const ids = this.products.map((product) => product.id);
      id = Math.max(...ids) + 1;
    }
    return id;
  }

  uploadProduct(product) {
    if (product) {
      const id = this.getProductId();
      if (this.products?.length)
        this.products = [...this.products, { ...product, id }];
      else this.products = [{ ...product, id }];
      return { ...product, id };
    }
  }

  updateProduct(id, product) {
    const productToUpdate = this.getProductById(id);
    if (productToUpdate && productToUpdate.id) {
      const filteredProducts = this.products.filter((item) => item.id !== id);
      this.products = [...filteredProducts, { ...productToUpdate, ...product }];
      return { ...productToUpdate, ...product };
    } else {
      const errorMessage = productToUpdate;
      return errorMessage;
    }
  }

  deleteProduct(id) {
    const productToDelete = this.getProductById(id);
    if (productToDelete && productToDelete.id) {
      const filteredProducts = this.products.filter((item) => item.id !== id);
      this.products = filteredProducts;
      return "El producto se ha borrado con éxito";
    } else {
      const errorMessage = productToDelete;
      return errorMessage;
    }
  }
}
const productos = new Product();

module.exports = productos;

// {
//     "title": "Escuadra",
//     "price": 123.45,
//     "thumbnail":
//       "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
// }
