const { getProductsFromFaker, getMessagesFromFaker } = require("../helpers");

const getRandomProducts = async (container) => {
  const products = getProductsFromFaker(5);
  console.log(products);
  container.insertValues(products);
  return products;
};

const getRandomMessages = async (container) => {
  const messages = getMessagesFromFaker(5);
  console.log(messages);
  const formattedMessages = messages.map((msg) => ({
    author: `${msg.author.nombre} ${msg.author.apellido}`,
    nombre: msg.author.nombre,
    apellido: msg.author.apellido,
    edad: msg.author.edad,
    alias: msg.author.alias,
    avatar: msg.author.avatar,
    text: msg.text,
  }));
  container.insertValues(formattedMessages);
  return formattedMessages;
};

module.exports = { getRandomProducts, getRandomMessages };
