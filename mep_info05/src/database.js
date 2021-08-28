const mysql = require('promise-mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'circuito05'
});

function getConnection() {
  return connection;
}

module.exports = { getConnection };