const settings = require("./settings"); // settings.json
let fName = process.argv[2];
let lName = process.argv[3];
let dob = process.argv[4];

var knex = require("knex")({
  client: "pg",
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database
  }
});

function addFamousPeople(fName, lName, dob) {
  knex
    .insert({ first_name: fName, last_name: lName, birthdate: new Date(dob) })
    .into("famous_people")
    .finally(function() {
      knex.destroy();
    });
  console.log(fName + lName + dob);
}

addFamousPeople(fName, lName, dob);
