const socket = io();

const title = document.getElementById("title");
const price = document.getElementById("price");
const thumbnail = document.getElementById("thumbnail");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const edad = document.getElementById("edad");
const alias = document.getElementById("alias");
const avatar = document.getElementById("avatar");
const text = document.getElementById("text");

function addProduct(e) {
  const productToAdd = {
    title: title.value,
    price: price.value,
    thumbnail: thumbnail.value,
  };
  socket.emit("add-product", productToAdd);
  return false;
}

socket.on("show-all-products", (products) => {
  const table = document.getElementById("sockets-table");
  const tableRows = document.getElementById("table");
  const text = document.getElementById("no-products-text");
  if (!products.length) {
    table.style.display = "none";
    text.style.display = "block";
    return;
  }
  table.style.display = "block";
  text.style.display = "none";
  const tableElements = products
    .map(({ id, title, price, thumbnail }) => {
      return `
        <tr key=${id}>
          <td scope="col">${title}</td>
          <td scope="col">$${price}</td>
          <td scope="col"><img src=${thumbnail} style='width:30px' /></td>
        </tr>`;
    })
    .join(" ");

  tableRows.innerHTML = tableElements;
  title.value = "";
  price.value = "";
  thumbnail.value = "";
});

function addMessage(e) {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  const newMessage = {
    nombre: nombre.value,
    apellido: apellido.value,
    edad: edad.value,
    alias: alias.value,
    avatar: avatar.value,
    text: text.value,
    date: formattedDate,
  };
  socket.emit("add-message", { ...newMessage });
  return false;
}

function renderMessages(messages) {
  const messageContainer = document.getElementById("messages");
  if (messages.length) {
    const messageItems = messages
      .map(({ alias, text, date }) => {
        return `<p style="color: brown"><strong class="text-primary">${alias}</strong>
      [${date}]: <span class="text-success">${text}</span></p>`;
      })
      .join(" ");
    messageContainer.innerHTML = messageItems;
    nombre.value = "";
    apellido.value = "";
    edad.value = "";
    alias.value = "";
    avatar.value = "";
    text.value = "";
  }
}

socket.on("show-all-messages", (messages) => {
  renderMessages(messages);
});
