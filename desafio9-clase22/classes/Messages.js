const fs = require("fs");

class Messages {
  constructor() {
    this.messages = [];
  }

  readMessages() {
    try {
      const data = fs.readFileSync("./messages.json");
      this.message = JSON.parse(data);
      return this.message;
    } catch (err) {
      throw new Error(err);
    }
  }

  saveMessages(messageToAdd) {
    const { user, message } = messageToAdd;
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    const newMessage = {
      user,
      message,
      date: formattedDate,
    };

    this.message = [...this.message, newMessage];

    try {
      fs.writeFileSync(
        "./messages.json",
        JSON.stringify(this.message, null, 2)
      );
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = Messages;
