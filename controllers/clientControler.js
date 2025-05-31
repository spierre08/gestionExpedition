const con = require("../models/data");

//======= Rendu pour afficher la liste de tous les clients
exports.liste = (req, res) => {
  //====== Vérifier si l'utilisateur est conneccté
  if (req.session.email) {
    con.query("SELECT * FROM clients ORDER BY id DESC", (error, row) => {
      if (error) console.log(error);
      res.render("client", { row, email: req.session.email });
    });
  } else {
    res.redirect("/");
  }
};

//=======Rendu pour la suppression d'un client
exports.suppression = (req, res) => {
  const id = req.params.id;

  con.query("DELETE FROM clients WHERE id=?", [id], (error, row) => {
    if (error) console.log(error);

    res.redirect("/client");
  });
};

//======= Rendu pour la page de modification d'un client
exports.editer = (req, res) => {
  const id = req.params.id;

  //====== Vérifier si l'utilisateur est conneccté
  if (req.session.email) {
    con.query("SELECT * FROM clients WHERE id=?", [id], (error, row) => {
      if (error) console.log(error);

      res.render("editer_client", { client: row[0], email: req.session.email });
    });
  } else {
    res.redirect("/");
  }
};

//======= Rendu pour modifier les informations d'un client
exports.modifier = (req, res) => {
  const id = req.params.id;
  const { nom, tel, email, adresse } = req.body;
  con.query(
    "UPDATE clients SET nom=?, adresse=?, email=?, telephone=? WHERE id=?",
    [nom, adresse, email, tel, id],
    (error, row) => {
      if (error) console.log(error);

      res.redirect("/client");
    }
  );
};
