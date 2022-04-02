import mysql from 'mysql';

let connection;

export function connectDb() {
  connection = mysql.createConnection({
    host     : 'http://localhost:3306',
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
  });
}

export function getUsers() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * from users', function (error, results, fields) {
      if (error) {
        reject();
      }

      resolve(results);
    });
  });
}
