const con = require("../models/data");
const validator = require("validator");

exports.interfaceController = (req, res) => {
  if (req.session.email) {
    con.query("SELECT * FROM clients ORDER BY id DESC", (error, row) => {
      if (error) console.log(error);
      res.render("interfaceUtilisateur", { row, email: req.session.email });
    });
  } else {
    res.redirect("/");
  }
};

//======= Rendu de la page d'ajout d'un client
exports.ajout = (req, res) => {
  //======= Vérifier si l'utilisateur est connecté
  if (req.session.email) {
    res.render("ajout_client", {
      erreur_client: "",
      succes_client: "",
      email: req.session.email,
    });
  } else {
    res.redirect("/");
  }
};

//======= Module d'ajout un client
exports.ajoutClient = (req, res) => {
  const { nom, tel, email, adresse } = req.body;
  //========= Vérifier si les champs sont vides
  if (
    validator.isEmpty(nom) ||
    validator.isEmpty(tel) ||
    validator.isEmpty(email) ||
    validator.isEmpty(adresse)
  ) {
    res.render("ajout_client", {
      erreur_client: "Veuillez remplir ces champs !",
      succes_client: "",
      email: req.session.email,
    });
  } else {
    //========= Vérifier le numéro de téléphone de type numérique
    if (validator.isNumeric(tel)) {
      //======== Vériferi si la taille du numéro de téléphone comporte 9 chiffres
      if (tel.length == 9) {
        //======== Requête permette de vérifier si un numéro de téléphone ou une adresse mail saisi existe déjà dans la bas de données
        con.query(
          "SELECT telephone, email FROM clients WHERE telephone=? OR email=?",
          [tel, email],
          (error, result) => {
            if (error) console.log(error);
            //======== Vérification de l'existence
            if (result.length > 0) {
              res.render("ajout_client", {
                erreur_client: "Cet email ou ce numéro existe déjà !",
                succes_client: "",
                email: req.session.email,
              });
            } else {
              let sql =
                "INSERT INTO clients(nom,adresse,email,telephone) VALUES(?,?,?,?)";
              con.query(sql, [nom, adresse, email, tel], (error, result1) => {
                if (error) console.log(error);

                res.render("ajout_client", {
                  erreur_client: "",
                  succes_client: "Client ajouté avec succès",
                  email: req.session.email,
                });
              });
            }
          }
        );
      } else {
        res.render("ajout_client", {
          erreur_client: "Le numéro de téléphone doit comporter 9 chiffres",
          succes_client: "",
          email: req.session.email,
        });
      }
    } else {
      res.render("ajout_client", {
        erreur_client: "Le numéro de téléphone doit comporter que des chffres",
        succes_client: "",
        email: req.session.email,
      });
    }
  }
};

//======= Rendu pour la recherche d'un client
exports.rechercher = (req, res) => {
  //====== Vérifier si l'utilisateur est conneccté
  if (req.session.email) {
    con.query("SELECT * FROM clients ORDER BY id DESC", (error, row) => {
      if (error) console.log(error);
      res.render("rch_client", { row, email: req.session.email });
    });
  } else {
    res.redirect("/");
  }
};

//====== Rechercher un client par le nom ou l'adresse
exports.filtre = (req, res) => {
  const { recherche } = req.body;

  con.query(
    "SELECT * FROM clients WHERE nom LIKE ? OR adresse LIKE ? ORDER BY id DESC",
    ["%" + recherche + "%", "%" + recherche + "%"],
    (error, row) => {
      if (error) console.log(error);

      res.render("rch_client", { row, email: req.session.email });
    }
  );
};
