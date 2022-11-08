const fs = require("fs");

class Contenedor {
  constructor(nombre) {
    this.nombre = nombre;
    this.file = [];
  }

  save(object) {
    let id;
    if (!this.file.length) {
      id = 1;
      this.file.push({ ...object, id });
    } else {
      const ids = this.file.map((file) => file.id);
      id = Math.max(...ids) + 1;
      this.file.push({ ...object, id });
    }
    fs.promises
      .writeFile(`./${this.nombre}.txt`, JSON.stringify(this.file, null, 2))
      .then(() => id)
      .catch((error) => {
        throw new Error(
          "Se produjo un error al intentar guardar el archivo. " + error
        );
      });
  }

  getRandom() {
    let item = {};
    const maxId = Math.max(...this.file.map((file) => file.id));
    do {
      const randomId = Math.floor(Math.random() * (maxId + 1));
      item = this.file.find((object) => object.id === randomId);
    } while (item === undefined);
    if (Object.entries(item).length) {
      return item;
    } else {
      return "No hay productos guardados";
    }
  }

  getById(id) {
    return this.file.find((object) => object.id === id) || null;
  }

  getAll() {
    return this.file.length ? this.file : "No hay productos";
  }

  async deleteById(id) {
    const newFile = this.file.filter((object) => object.id !== id);
    this.file = newFile;
    try {
      await fs.promises.writeFile(
        `./${this.nombre}.txt`,
        JSON.stringify(newFile, null, 2)
      );
    } catch (error) {
      throw new Error("No se ha podido eliminar el producto. " + error);
    }
  }

  async deleteAll() {
    this.file = [];
    try {
      await fs.promises.writeFile(
        `./${this.nombre}.txt`,
        JSON.stringify(this.file, null, 2)
      );
    } catch (error) {
      throw new Error("La operación no ha podido ser realizada " + error);
    }
  }
}

const products = new Contenedor("productos");

const saveProducts = () => {
  products.save({
    title: "Escuadra",
    price: 123.45,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
  });
  products.save({
    title: "Calculadora",
    price: 234.56,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
  });
  products.save({
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
  });
};

module.exports = { products, saveProducts };
