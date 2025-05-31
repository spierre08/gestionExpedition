const con = require("../models/data");
const validator = require("validator");
const bcrypt = require("bcrypt");

//======== Rendu pour afficher tous les utilisateurs
exports.utilisateur = (req, res) => {
  //=====  Vérifier si l'utilisateur est connecté
  if (req.session.email) {
    con.query("SELECT * FROM utilisateurs", (error, row) => {
      if (error) console.log(error);

      res.render("utilisateur", { row, email: req.session.email });
    });
  } else {
    res.redirect("/");
  }
};

//======== Rendu pour la page d'ajout d'un utilisateur
exports.ajout = (req, res) => {
  //====== Vérifier si l'utilisaeur est connecté
  if (req.session.email) {
    res.render("ajout_utilisateur", {
      erreur: "",
      succes: "",
      email: req.session.email,
    });
  } else {
    res.redirect("/");
  }
};

//======== Ajout d'un nouveau utilisateur
exports.nouveau = (req, res) => {
  const { nom, email, role, mdp } = req.body;
  //======== Vérifier si les champs sont vides
  if (
    validator.isEmpty(nom) ||
    validator.isEmpty(email) ||
    validator.isEmpty(mdp)
  ) {
    res.render("ajout_utilisateur", {
      erreur: "Veuillez remplir ces champs !",
      succes: "",
      email: req.session.email,
    });
  } else {
    //======= Vérifier si le mot de passe comporte 6 caractères ou plus
    if (mdp.length >= 6) {
      //======== Vérifier si l'adresse mail saisie existe déjà dans la base de données
      con.query(
        "SELECT email FROM utilisateurs WHERE email = ?",
        [email],
        (error, row) => {
          if (error) console.log(error);
          //======= Vérifier de l'existence
          if (row.length > 0) {
            res.render("ajout_utilisateur", {
              erreur: "Cet email est déjà lié à un compte",
              succes: "",
              email: req.session.email,
            });
          } else {
            const salt = bcrypt.genSaltSync(12);
            const hashedPassword = bcrypt.hashSync(mdp, salt); //====== Cryptage du mot de passe
            let sql =
              "INSERT INTO utilisateurs(nom,email,role,mot_de_passe,date_creation) VALUES(?,?,?,?,NOW())";
            con.query(
              sql,
              [nom, email, role, hashedPassword],
              (error, result) => {
                if (error) console.log(error);

                res.render("ajout_utilisateur", {
                  erreur: "",
                  succes: "Utilisateur ajouté avec succès",
                  email: req.session.email,
                });
              }
            );
          }
        }
      );
    } else {
      res.render("ajout_utilisateur", {
        erreur: "Le mot de passe doit être minimum 6 caractères",
        succes: "",
        email: req.session.email,
      });
    }
  }
};

//======== Rendu de modification du rôle d'un utilisateur
exports.bloquer = (req, res) => {
  const id = req.params.id;

  //====== Vérifier si l'utilisaeur est connecté
  if (req.session.email) {
    con.query("SELECT * FROM utilisateurs WHERE id=?", [id], (error, row) => {
      if (error) console.log(error);

      res.render("editer_utilisateur", { row, email: req.session.email });
    });
  } else {
    res.redirect("/");
  }
};

//======== Modification du rôle de l'utilisateur
exports.modifier = (req, res) => {
  const id = req.params.id;
  const { role } = req.body;

  con.query(
    "UPDATE utilisateurs SET role=? WHERE id=?",
    [role, id],
    (error, row) => {
      if (error) console.log(error);

      res.redirect("/utilisateur");
    }
  );
};

//======== Rendu pour la suppression d'un utilisateur
exports.supprimer = (req, res) => {
  const id = req.params.id;

  con.query("DELETE FROM utilisateurs WHERE id=?", [id], (error, row) => {
    if (error) console.log(error);

    res.redirect("/utilisateur");
  });
};

//======= Rendu sur la page de recherche d'un utilisateur
exports.recherche = (req, res) => {
  //====== Vérifier si l'utilisaeur est connecté
  if (req.session.email) {
    con.query("SELECT * FROM utilisateurs", (error, row) => {
      if (error) console.log(error);

      res.render("rch_utilisateur", { row, email: req.session.email });
    });
  } else {
    res.redirect("/");
  }
};

//======= Rechercher un utilisateur par son nom ou par son rôle ou par son email
exports.filtre = (req, res) => {
  const { recherche } = req.body;

  con.query(
    "SELECT * FROM utilisateurs WHERE nom LIKE ? OR role LIKE ? OR email LIKE ?",
    ["%" + recherche + "%", "%" + recherche + "%", "%" + recherche + "%"],
    (error, row) => {
      if (error) console.log(error);

      res.render("rch_utilisateur", { row, email: req.session.email });
    }
  );
};

//======= Rendu pour le profil utilisateur
exports.profile = (req, res) => {
  res.send("Page permettant à l'utilisateur permettant de voir son profile");
};
