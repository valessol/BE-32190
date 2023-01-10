const { faker } = require("@faker-js/faker");
const crypto = require("crypto");
faker.locale = "es";

const getProductFromFaker = (id) => {
  return {
    id,
    title: faker.commerce.product(),
    price: faker.commerce.price(1000, 5000, 0),
    thumbnail: faker.image.fashion(),
  };
};

const getProductsFromFaker = (quantity) => {
  let products = [];

  for (let i = 0; i < quantity; i++) {
    const id = crypto.randomUUID();
    const product = getProductFromFaker(id);
    products = [...products, product];
  }

  return products;
};

const getMessageFromFaker = (id) => {
  const nombre = faker.name.firstName();
  const apellido = faker.name.lastName();
  const alias = nombre + apellido;
  return {
    author: {
      id,
      nombre,
      apellido,
      edad: faker.random.numeric(2),
      alias,
      avatar: faker.image.avatar(),
    },
    text: faker.lorem.text(),
  };
};

const getMessagesFromFaker = (quantity) => {
  let messages = [];

  for (let i = 0; i < quantity; i++) {
    const id = crypto.randomUUID();
    const msg = getMessageFromFaker(id);
    messages = [...messages, msg];
  }

  return messages;
};

module.exports = { getProductsFromFaker, getMessagesFromFaker };
