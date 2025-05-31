const con = require("../models/data");
const validator = require("validator");
const bcrypt = require("bcrypt");

//======= Rendu pour la page de connexion
exports.login = (req, res) => {
  res.render("connexion.ejs", { erreur: "" });
};

//======= Rendu pour la page de succeès
exports.succes = (req, res) => {
  res.render("succes");
};

//======= Rendu pour le système d'authentification
exports.authentification = (req, res) => {
  const { email, password } = req.body;
  //======= Vérifier si les champs sont vides
  if (validator.isEmpty(email) || validator.isEmpty(password)) {
    res.render("connexion.ejs", { erreur: "Veuillez saisir vos informations" });
  } else {
    //======= Requête permettant de sélection l'adresse mail d'un utilisateur
    let sql = "SELECT * FROM utilisateurs WHERE email=?";
    con.query(sql, [email], (error, row) => {
      if (error) console.log(error);
      //======== Vérifier si l'adresse mail est trouvée
      if (row.length > 0) {
        const hashedPassword = row[0].mot_de_passe;
        const matched = bcrypt.compareSync(password, hashedPassword); //======== Comparer le mot de passe saisi et le mot crypté
        const roleUser = row[0].role;
        const IdUser = row[0].id;
        //======== Vérification si les deux mots de passes sont conformes
        if (matched) {
          if (roleUser == "Administrateur") {
            // req.session.isLoggedIn = true
            req.session.email = email;
            // req.session.IdUser = IdUser
            res.redirect("/dashbord");
          } else if (roleUser == "Utilisateur") {
            // req.session.isLoggedIn = true
            req.session.email = email;
            res.redirect("/interface");
          } else {
            // req.session.isLoggedIn = true
            // req.session.email = email
            res.render("connexion.ejs", {
              erreur: "Vous n'avez aucun droit d'accès !",
            });
          }
        } else {
          res.render("connexion.ejs", { erreur: "Mot de passe incorrecte" });
        }
      } else {
        res.render("connexion.ejs", { erreur: "Email incorrecte" });
      }
    });
  }
};

//======== Rendu pour la déconnexion d'un utilisateur
exports.deconnexion = (req, res) => {
  //======== Destruction de toutes les sessions
  req.session.destroy(function (erreur) {
    if (erreur) {
      console.log(erreur);
      res.redirect("/");
    }
    res.redirect("/");
  });
};

//======== Rendu pour la reinitialisation du mot de passe
exports.reinitialisation = (req, res) => {
  res.render("reinitialisation", { erreur: "" });
};

//======== Rendu pour la vérification de l'email de l'utilisateur saisi
exports.verifierEmail = (req, res) => {
  const { email } = req.body;
  //======= Vérifier si l"adresse mail est saisie est de type mail
  if (validator.isEmpty(email)) {
    res.render("reinitialisation", { erreur: "Veuillez saisir votre email" });
  } else {
    //====== Requête de sélection de l'email d'un utilisateur
    con.query(
      "SELECT * FROM utilisateurs WHERE email=?",
      [email],
      (error, result) => {
        if (error) console.log(error);

        if (result.length > 0) {
          req.session.emailRecuperation = email;

          const salt = bcrypt.genSaltSync(12);
          const tokenHash = bcrypt.hashSync(salt, salt);
          con.query(
            "UPDATE utilisateurs SET token=? WHERE email=?",
            [tokenHash, req.session.emailRecuperation],
            (error, result) => {
              if (error) console.log(error);

              res.redirect("/succes");
            }
          );
        } else {
          res.render("reinitialisation", {
            erreur: "Email erroné dans notre système !",
          });
        }
      }
    );
  }
};

//======== Page de modification du mot de passe de l'utilisateur
exports.modification = (req, res) => {
  res.send("Page pour la modification du mot passe de l'utilisateur");
};
