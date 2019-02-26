const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

const value = process.argv[2];

client.connect(err => {
  if (err) throw err;

  findPerson(client, value);
});

function findPerson(db, first_name) {
  const query = `SELECT * FROM famous_people WHERE first_name LIKE ($1::text)`;

  db.query(query, [first_name], (err, res) => {
    if (err) throw err;
    displayResult(db, value, res.rows);
  });
}

function displayResult(db, value, results) {
  for (let name in results) {
    let count = Number(name) + 1;
    let birthdate = results[name].birthdate;
    console.log(`- ${count}: ${results[name].first_name} ${results[name].last_name}, born ${birthdate}`);
    db.end();
  }
}
