const mysql = require('promise-mysql');

const connection = mysql.createConnection({
  host: 'b3oolmqbbeugdulfffe9-mysql.services.clever-cloud.com',
  user: 'ulsrsdg6z6micyv1',
  password: 'I7FpRCjZWeUDqXRSSy2E',
  database: 'b3oolmqbbeugdulfffe9'
});

function getConnection() {
  return connection;
}

module.exports = { getConnection };