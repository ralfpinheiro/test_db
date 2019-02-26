// const pg = require("pg");
const settings = require("./settings"); // settings.json
const value = process.argv[2];

var knex = require("knex")({
  client: "pg",
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database
  }
});

function errorHandling(err) {
  if (err) {
    return console.error("Error:", err);
  }
}

function findPeople(name) {
  knex
    .select("*")
    .from("famous_people")
    .where("first_name", "=", name)
    .asCallback(function(err, rows) {
      //   errorHandling(err);
      console.log(`Found ${rows.length} person(s) by the name '${name}'`);

      for (let name in rows) {
        let count = Number(name) + 1;
        console.log(
          `- ${count} ${rows[name].first_name} ${rows[name].last_name}, born ${rows[name].birthdate
            .toString()
            .slice(0, 15)}`
        );
      }
    })
    .finally(function() {
      knex.destroy();
    });
}

findPeople(value);
