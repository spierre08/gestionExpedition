let mysql = require("mysql");

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "expedition",
});

con.connect(function (erreur) {
  if (erreur) {
    console.log("Erreur de connexion de la base de données...");
  } else {
    console.log("Connexion à la base de données");
  }
});

module.exports = con;
