const mysql = require("mysql");
const credConfig = require("./config");

const dbConn = mysql.createConnection({
  host: credConfig.dbHost,
  user: credConfig.dbUser,
  port: credConfig.dbPort,
  password: credConfig.dbPassword,
  database: "products",
});

dbConn.connect((err) => {
  if (err) throw err;
  console.log("MySql connected...");

  // return dbConn.query("SELECT * FROM products", function (err, result, fields) {
  //   if (err) throw err;
  //   console.log(result);
  //   return result;
  // });
});

const dbAction = (sql, callback) => {
  dbConn.query(sql, function (err, results) {
    if (err) {
      throw err;
    }
    return callback(results);
  });
};

const dbEnd = () => dbConn.end();

module.exports = { dbAction, dbEnd };
