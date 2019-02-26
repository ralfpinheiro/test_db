const pg = require("pg");
const settings = require("./settings"); // settings.json
const value = process.argv[2];

var knex = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "settings.user",
    password: "settings.password",
    database: "settings.database"
  }
});

console.log(knex.from("famous_people").select("first_name", "last_name", "birthdate"));
