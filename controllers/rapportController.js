const con = require("../models/data");
const validator = require("validator");

//======= Rapport sur la page de raaport
exports.rapport = (req, res) => {
  //======= Vérifier si l'utilisateur est connecté
  if (req.session.email) {
    con.query(
      `SELECT rapports.id, type_rapport, date_rapport, contenu, nom FROM rapports 
                      INNER JOIN utilisateurs ON utilisateurs.id = rapports.utilisateur_id ORDER BY date_rapport DESC`,
      (error, row) => {
        if (error) console.log(error);

        res.render("rapport", { row, email: req.session.email });
      }
    );
  } else {
    res.redirect("/");
  }
};

//======= Rendu sur la page pour régider le rapport
exports.nouveau = (req, res) => {
  //======= Vérifier si l'utilisateur est connecté
  if (req.session.email) {
    res.render("ajout_rapport", { erreur: "", succes: "" });
  } else {
    res.redirect("/");
  }
};

//======= Rediger un noubeau rapport
exports.ajout = (req, res) => {
  const { type_raport, contenu } = req.body;
  const utilisateurId = req.session.IdUser;

  let sql =
    "INSERT INTO rapports(utilisateur_id,type_rapport,date_rapport,contenu) VALUES(?,?,curdate(),?)";

  //====== Vérifier si le champs est vide
  if (validator.isEmpty(contenu)) {
    res.render("ajout_rapport", {
      erreur: "Veuillez saisir le contenu du rapport",
      succes: "",
    });
  } else {
    con.query(sql, [utilisateurId, type_raport, contenu], (error, row) => {
      if (error) console(error);

      res.render("ajout_rapport", {
        erreur: "",
        succes: "Rapport d'expédition ajouté avec succès !",
      });
    });
  }
};

//======== Obtenir un rapport par id
exports.trouveId = (req, res) => {
  const { id } = req.params;

  let sql = `SELECT rapports.id, type_rapport, date_rapport, contenu, nom FROM rapports 
                  INNER JOIN utilisateurs ON utilisateurs.id = rapports.utilisateur_id
                  WHERE rapports.id=?
                  `;

  con.query(sql, [id], (error, result) => {
    if (error) console.log(error);

    res.render("detailRapport", { detail: result });
  });
};
