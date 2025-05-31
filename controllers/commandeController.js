const con = require("../models/data");
const validator = require("validator");

//======= Rendu sur la page des commandes
exports.commande = (req, res) => {
  sql =
    "SELECT commandes.id, reference_commande, date_commande, statut, date_livraison, nom FROM commandes INNER JOIN clients ON clients.id=commandes.client_id ORDER BY reference_commande DESC";
  //======= Vérifier si l'utilisateur est connecté
  if (req.session.email) {
    con.query(sql, (error, row) => {
      if (error) console.log(error);

      res.render("commande", { row, email: req.session.email });
    });
  } else {
    res.redirect("/");
  }
};

//====== Rendu sur la pade d'ajout de commande
exports.ajout = (req, res) => {
  //======= Vérifier si l"utilisateur est connecté
  if (req.session.email) {
    con.query("SELECT * FROM clients ORDER BY id DESC", (error, row) => {
      if (error) console.log(error);

      res.render("ajout_commande", { row, email: req.session.email });
    });
  } else {
    res.redirect("/");
  }
};

//======= Ajouter une nouvelle commande
exports.nouveau = (req, res) => {
  const { client, statut, date_commande, date_livraison } = req.body;

  let sql =
    "INSERT INTO commandes(client_id,reference_commande,date_commande,statut,date_livraison) VALUES(?,?,?,?,?)";
  let id = client.toString();

  let aleatoire = Math.random() * 10000;
  let generateur = Math.floor(aleatoire);
  let reference = "Ref-N° : " + id + generateur;

  con.query(
    sql,
    [client, reference, date_commande, statut, date_livraison],
    (error, result) => {
      if (error) console.log(error);

      res.redirect("/interface/commande");
    }
  );
};

//======= Rendu sur la page d'édition de commande
exports.editer = (req, res) => {
  const id = req.params.id;
  //======= Vérifier si l'utilisateur est connecté
  if (req.session.email) {
    con.query("SELECT * FROM commandes WHERE id=?", [id], (error, row) => {
      if (error) console.log(error);

      res.render("editer_commande", {
        commande: row[0],
        email: req.session.email,
      });
    });
  } else {
    res.redirect("/interface/commande");
  }
};

//======== Modification du statut d'une commande
exports.modifier = (req, res) => {
  const id = req.params.id;

  const { statut } = req.body;

  con.query(
    "UPDATE commandes SET statut=? WHERE id=?",
    [statut, id],
    (error, row) => {
      if (error) console.log(error);

      res.redirect("/interface/commande");
    }
  );
};

//======== Rendu sur la page de recherche d'une commande
exports.recherche = (req, res) => {
  //======== Vérifier si l'utilisateur est connécté
  if (req.session.email) {
    res.send("Page de recherche d'une commande");
  } else {
    res.redirect("/");
  }
};

//======= Rendu sur la page de recherche d'une commande sur l'interface utilisateur
exports.recherche1 = (req, res) => {
  sql =
    "SELECT commandes.id, reference_commande, date_commande, statut, date_livraison, nom FROM commandes INNER JOIN clients ON clients.id=commandes.client_id ORDER BY reference_commande DESC";
  //======== Vérifier si l'utilisateur est connécté
  if (req.session.email) {
    // res.render("rch_interface_commande")
    con.query(sql, (error, row) => {
      if (error) console.log(error);

      res.render("rch_interface_commande", { row, email: req.session.email });
    });
  } else {
    res.redirect("/");
  }
};

//====== Rechercher une commande parla référence commande ou par la date de commande, pour par la date de livraison
// ou par le statut de la commande
exports.filtre = (req, res) => {
  const { recherche } = req.body;

  con.query(
    `SELECT clients.id, clients.nom, commandes.id, commandes.client_id, commandes.reference_commande,
                 commandes.date_commande, commandes.statut, commandes.date_livraison from commandes
                 INNER JOIN clients ON commandes.client_id = clients.id WHERE clients.nom LIKE ? OR commandes.reference_commande LIKE ?
                 OR commandes.date_commande LIKE ? OR commandes.statut LIKE ?
                 OR commandes.date_livraison LIKE ? ORDER BY commandes.id DESC
            `,
    [
      "%" + recherche + "%",
      "%" + recherche + "%",
      "%" + recherche + "%",
      "%" + recherche + "%",
      "%" + recherche + "%",
    ],
    (error, row) => {
      if (error) console.log(error);

      res.render("rch_interface_commande", { row, email: req.session.email });
    }
  );
};

//======= Rendu sur la page des utilisateurs
exports.interfaceCommande = (req, res) => {
  sql =
    "SELECT commandes.id, reference_commande, date_commande, statut, date_livraison, nom FROM commandes INNER JOIN clients ON clients.id=commandes.client_id ORDER BY reference_commande DESC";
  //======= Vérifier si l'utilisateur est connecté
  if (req.session.email) {
    con.query(sql, (error, row) => {
      if (error) console.log(error);

      res.render("interface_commande", { row, email: req.session.email });
    });
  } else {
    res.redirect("/");
  }
};
