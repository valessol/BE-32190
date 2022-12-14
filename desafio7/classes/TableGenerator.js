const knexModule = require("knex");

class Table {
  constructor(config, name, columns) {
    this.name = name;
    this.config = config;
    this.columns = columns;
  }
  getKnex() {
    return knexModule(this.config);
  }

  async hasTable() {
    const knex = this.getKnex();
    const existTable = await knex.schema.hasTable(this.name);
    return existTable;
  }

  async createTable() {
    const knex = this.getKnex();
    const existTable = await this.hasTable();
    if (existTable) return;
    knex.schema
      .createTable(this.name, (table) => {
        this.columns.forEach((column) => {
          const { type, name } = column;
          if (type === "increments") table.increments(name);
          if (type === "string") table.string(name);
          if (type === "integer") table.integer(name);
          if (type === "date") table.date(name);
        });
        table.timestamp("created_at").defaultTo(knex.fn.now());
      })
      .then(() => {
        console.log(`Table ${this.name} has been created`);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        knex.destroy();
      });
  }

  async insertValues(data) {
    const knex = this.getKnex();
    const existTable = await this.hasTable();
    if (!existTable) {
      await this.createTable();
    }

    knex(this.name)
      .insert(data)
      .then(() => {
        console.log("Values inserted");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        knex.destroy();
      });
  }

  async selectAllData(orderBy = "id") {
    const knex = this.getKnex();
    const existTable = await this.hasTable();
    if (!existTable) {
      await this.createTable();
    }
    const response = await knex
      .from(this.name)
      .select("*")
      .orderBy(orderBy, "asc");
    await knex.destroy();
    return response;
  }

  deleteData(filterBy, operator, value) {
    const knex = this.getKnex();
    knex
      .from(this.name)
      .where(filterBy, operator, value)
      .del()
      .then(() => console.log("Registry deleted"))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        knex.destroy();
      });
  }
  updateData(column, row, valueToUpdate) {
    const knex = this.getKnex();
    knex
      .from(this.name)
      .where({ [column]: row })
      .update({ ...valueToUpdate })
      .then(() => console.log("Registry updated"))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        knex.destroy();
      });
  }
}

module.exports = Table;
