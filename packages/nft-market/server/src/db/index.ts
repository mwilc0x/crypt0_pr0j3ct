import mysql from 'mysql2';

let connection;

export async function connectDb() {
  connection = await mysql.createConnection({
    host     : process.env.MYSQL_HOST,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE,
    connectTimeout: 25000
  });
  return;
}

export function getUsers() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * from users', function (error, results, fields) {
      if (error) {
        console.log('error connecting database::', error);
        reject();
      }

      resolve(results);
    });
  });
}
