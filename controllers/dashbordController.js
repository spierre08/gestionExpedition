const con = require("../models/data");

//======== Rende sur la page de tableau de bord
exports.dashbord = (req, res) => {
  //====== Vérifier si l'utilisateur est conneccté
  if (req.session.email) {
    con.query("SELECT COUNT(*) AS Id_clients FROM clients", (error, row1) => {
      if (error) console.log(error);

      const totatClient = row1[0].Id_clients;
      con.query(
        "SELECT COUNT(*) AS Id_commandes FROM commandes",
        (error, row2) => {
          if (error) console.log(error);

          let totaCommande = row2[0].Id_commandes;
          con.query(
            "SELECT COUNT(*) AS Id_expeditions FROM expeditions",
            (error, row3) => {
              if (error) console.log(error);

              let totalExpedition = row3[0].Id_expeditions;
              res.render("dashbord", {
                email: req.session.email,
                client: totatClient,
                commande: totaCommande,
                expedition: totalExpedition,
              });
            }
          );
        }
      );
    });
  } else {
    res.redirect("/");
  }
};
