productsColumns = [
  { type: "increments", name: "id" },
  { type: "string", name: "title" },
  { type: "integer", name: "price" },
  { type: "string", name: "thumbnail" },
];

messageColumns = [
  { type: "increments", name: "id" },
  { type: "author", name: "author" },
  { type: "string", name: "nombre" },
  { type: "string", name: "apellido" },
  { type: "string", name: "edad" },
  { type: "string", name: "alias" },
  { type: "string", name: "avatar" },
  { type: "string", name: "text" },
  { type: "string", name: "date" },
];

module.exports = { productsColumns, messageColumns };
