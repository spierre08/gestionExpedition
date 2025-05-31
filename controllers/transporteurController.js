const con = require("../models/data");
const validator = require("validator");

//======= Rendu de la page ajout
exports.ajout = (req, res) => {
  //======= Vérifier si l"utilisateur est connecté
  if (req.session.email) {
    res.render("ajout_transporteur", {
      erreur_tp: "",
      succes_tp: "",
      email: req.session.email,
    });
  } else {
    res.redirect("/");
  }
};

//======= Ajouter un nouveau transporteur
exports.nouveau = (req, res) => {
  const { nom, tel, adresse } = req.body;

  //======= Vérifier si les champs sont vides
  if (
    validator.isEmpty(nom) ||
    validator.isEmpty(tel) ||
    validator.isEmpty(adresse)
  ) {
    res.render("ajout_transporteur", {
      erreur_tp: "Veuiller remplir ces champs",
      succes_tp: "",
      email: req.session.email,
    });
  } else {
    //======= Vérifier si le numéro de téléphone est de type numérique
    if (validator.isNumeric(tel)) {
      //======= Vérifier le numéro de téléphone égal à neuf chiffres
      if (tel.length == 9) {
        //======= Requête permettant de vérifier si un numéro saisi eiste déjà dans la base de données
        con.query(
          "SELECT telephone FROM transporteurs WHERE telephone=?",
          [tel],
          (error, result) => {
            if (error) console.log(error);

            //========= Vérification de l'existence
            if (result.length > 0) {
              res.render("ajout_transporteur", {
                erreur_tp: "Le numéro de téléphone existe déjà",
                succes_tp: "",
                email: req.session.email,
              });
            } else {
              let sql =
                "INSERT INTO transporteurs(nom,telephone,adresse) VALUES(?,?,?)";
              con.query(sql, [nom, tel, adresse], (error, row) => {
                if (error) console.log(error);

                res.render("ajout_transporteur", {
                  erreur_tp: "",
                  succes_tp: "Transporteur ajouté avec succès !",
                  email: req.session.email,
                });
              });
            }
          }
        );
      } else {
        res.render("ajout_transporteur", {
          erreur_tp: "Le numéro de téléphone doit être égal à 9 chiffres",
          succes_tp: "",
          email: req.session.email,
        });
      }
    } else {
      res.render("ajout_transporteur", {
        erreur_tp: "Le numéro de téléphone doit comporter que des chiffres",
        succes_tp: "",
        email: req.session.email,
      });
    }
  }
};

//====== Rendu pour afficher la liste des clients
exports.liste = (req, res) => {
  //====== Vérifier  si l"utilisateur est connecté
  if (req.session.email) {
    con.query("SELECT * FROM transporteurs ORDER BY id ASC", (error, row) => {
      if (error) console.log(error);

      res.render("transporteur", { row, email: req.session.email });
    });
  } else {
    res.redirect("/");
  }
};

//====== Rendu pour afficher tous les transprteurs
exports.editer = (req, res) => {
  const id = req.params.id;

  //====== Vérifier  si l"utilisateur est connecté
  if (req.session.email) {
    con.query("SELECT * FROM transporteurs WHERE id=?", [id], (error, row) => {
      if (error) console.log(error);

      res.render("editer_transporteur", {
        tp: row[0],
        email: req.session.email,
      });
    });
  } else {
    res.redirect("/");
  }
};

//====== Rendu pour la page de modifier des informations d'un transporteur
exports.modifier = (req, res) => {
  const id = req.params.id;
  const { nom, tel, adresse } = req.body;

  con.query(
    "UPDATE transporteurs SET nom=?,telephone=?,adresse=? WHERE id=?",
    [nom, tel, adresse, id],
    (error, result) => {
      if (error) console.log(error);

      res.redirect("/transporteur");
    }
  );
};

//====== Rendu pour la suppression d'un transporteur
exports.supprimer = (req, res) => {
  const id = req.params.id;

  con.query("DELETE FROM transporteurs WHERE id=?", [id], (error, row) => {
    if (error) console.log(error);

    res.redirect("/transporteur");
  });
};

//======= Route pour la page de recherche d'un transporteur
exports.rechercher = (req, res) => {
  //======= Vérifier si l"utilisateur est connecté
  if (req.session.email) {
    con.query("SELECT * FROM transporteurs ORDER BY id", (error, row) => {
      if (error) console.log(error);

      res.render("rch_transporteur", { row, email: req.session.email });
    });
  } else {
    res.redirect("/");
  }
};

//====== Rechercher un client par le nom ou l'adresse
exports.filtre = (req, res) => {
  const { recherche } = req.body;

  con.query(
    "SELECT * FROM transporteurs WHERE nom LIKE ? OR adresse LIKE ?",
    ["%" + recherche + "%", "%" + recherche + "%"],
    (error, row) => {
      if (error) console.log(error);

      res.render("rch_transporteur", { row, email: req.session.email });
    }
  );
};
