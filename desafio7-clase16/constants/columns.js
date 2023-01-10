productsColumns = [
  { type: "increments", name: "id" },
  { type: "string", name: "title" },
  { type: "integer", name: "price" },
  { type: "string", name: "thumbnail" },
];

messageColumns = [
  { type: "increments", name: "id" },
  { type: "string", name: "user" },
  { type: "string", name: "message" },
  { type: "string", name: "date" },
];

module.exports = { productsColumns, messageColumns };
