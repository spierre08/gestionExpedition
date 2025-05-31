const con = require("../models/data");

//======= Rendu pour la page d'expédition
exports.expedition = (req, res) => {
  //======= Vérifier si l'utilisateur est connecté
  if (req.session.email) {
    con.query(
      `SELECT expeditions.id, numero_suivi, date_expedition, expeditions.statut as statuteE, reference_commande, nom FROM expeditions
                  INNER JOIN transporteurs ON transporteurs.id=expeditions.transporteur_id
                  INNER JOIN commandes ON commandes.id=expeditions.commande_id
                  ORDER BY id DESC `,
      (error, row) => {
        if (error) console.log("error");

        res.render("expedition", { row, email: req.session.email });
      }
    );
  } else {
    res.redirect("/");
  }
};

//======= Rendu pour l'ajout d'une nouvelle expédition
exports.ajout = (req, res) => {
  //========= Vérifier si l'utilisateur est connecté
  if (req.session.email) {
    con.query("SELECT * FROM commandes ORDER BY id DESC", (error, row1) => {
      if (error) console.log(error);

      con.query(
        "SELECT * FROM transporteurs ORDER BY id DESC",
        (error, row2) => {
          if (error) console.log(error);
          res.render("ajout_expedition", {
            row1,
            row2,
            email: req.session.email,
          });
        }
      );
    });
  } else {
    res.redirect("/");
  }
};

//======== Rendu pour ajouter une expédition
exports.nouveau = (req, res) => {
  const { commande_id, transporteur_id, date_expedition, statut } = req.body;

  let date = new Date();
  let id = transporteur_id.toString();
  let mois = date.getMonth();
  let annee = date.getFullYear();
  let aleatoire = Math.random() * 1000;
  let generer = Math.floor(aleatoire);
  let B = mois.toString();
  let C = annee.toString();
  let nouveau_suivi = id + B + C + generer,
    sql =
      "INSERT INTO expeditions(commande_id,transporteur_id,numero_suivi,date_expedition,statut) VALUES(?,?,?,?,?)";

  con.query(
    sql,
    [commande_id, transporteur_id, nouveau_suivi, date_expedition, statut],
    (error, row) => {
      if (error) console.log(error);

      res.redirect("/interface/expedition");
    }
  );
};

//======= Rendu pour la modification d'un expédition
exports.editer = (req, res) => {
  const id = req.params.id;

  //======== Vérifier si l"utilisateur est connecté
  if (req.session.email) {
    con.query(
      `SELECT expeditions.id, numero_suivi, date_expedition, statut, nom FROM expeditions
                  INNER JOIN transporteurs on transporteurs.id=expeditions.transporteur_id WHERE expeditions.id=?
                  `,
      [id],
      (error, row) => {
        if (error) console.log(error);

        con.query(
          "SELECT * FROM transporteurs ORDER BY id DESC",
          (error, row1) => {
            if (error) console.log(error);

            res.render("editer_expedition", {
              row,
              row1,
              email: req.session.email,
            });
          }
        );
      }
    );
  } else {
    res.redirect("/");
  }
};

//======= Rendu pour modifier une expédition
exports.modifer = (req, res) => {
  const id = req.params.id;
  const { transporteur_id, statut } = req.body;

  con.query(
    `UPDATE expeditions SET transporteur_id=?, statut=? WHERE id=?`,
    [transporteur_id, statut, id],
    (error, result) => {
      if (error) console.log(error);

      res.redirect("/interface/expedition/");
    }
  );
};

//======== Rendu sur la page recherche d'une expédition
exports.recherche = (req, res) => {
  res.send("Page de rechercher d'un expédition");
};

//======== Rendu sur la page expedition de l'interface utilisateur
exports.interfaceExpedition = (req, res) => {
  if (req.session.email) {
    con.query(
      `SELECT expeditions.id, numero_suivi, date_expedition, expeditions.statut as statuteE, reference_commande, nom FROM expeditions
                  INNER JOIN transporteurs ON transporteurs.id=expeditions.transporteur_id
                  INNER JOIN commandes ON commandes.id=expeditions.commande_id
                  ORDER BY id DESC `,
      (error, row) => {
        if (error) console.log("error");

        res.render("interface_expedition", { row, email: req.session.email });
      }
    );
  } else {
    res.redirect("/");
  }
};
