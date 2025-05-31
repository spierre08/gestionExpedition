const express = require("express");
router = express.Router();
const loginController = require("../controllers/loginController");
const clientController = require("../controllers/clientControler");
const transporteurController = require("../controllers/transporteurController");
const commandeController = require("../controllers/commandeController");
const expitionController = require("../controllers/expeditionController");
const rapportController = require("../controllers/rapportController");
// const userController = require("../controllers/userController")
const dashbordController = require("../controllers/dashbordController");
const interfaceController = require("../controllers/interfaceController");

//========= Router pour l'interface utilisateur administrateur
router.get("/", loginController.login);
router.post("/", loginController.authentification);
router.get("/deconnexion", loginController.deconnexion);
router.get("/reinitialisation", loginController.reinitialisation);
router.post("/reinitialisation", loginController.verifierEmail);
router.get("/modification", loginController.modification);
router.get("/succes", loginController.succes);
router.get("/client", clientController.liste);
router.get("/client/suppression/:id", clientController.suppression);
router.get("/client/editer/:id", clientController.editer);
router.post("/client/editer/:id", clientController.modifier);
// router.get("/client/recherche",clientController.rechercher)
// router.post("/client/recherche",clientController.filtre)
router.get("/dashbord", dashbordController.dashbord);
router.get("/transporteur", transporteurController.liste);
router.get("/transporteur/ajout", transporteurController.ajout);
router.post("/transporteur/ajout", transporteurController.nouveau);
router.get("/transporteur/editer/:id", transporteurController.editer);
router.post("/transporteur/editer/:id", transporteurController.modifier);
router.get("/transporteur/supprimer/:id", transporteurController.supprimer);
router.get("/transporteur/recherche", transporteurController.rechercher);
router.post("/transporteur/recherche", transporteurController.filtre);
router.get("/commande", commandeController.commande);
router.get("/commande/recherche", commandeController.recherche);
router.get("/expedition", expitionController.expedition);
// router.get("/expedition/editer/:id",expitionController.editer)
// router.post("/expedition/editer/:id",expitionController.modifer)
router.get("/expedition/recherche", expitionController.recherche);
router.get("/rapport", rapportController.rapport);
router.get("/rapport/ajout", rapportController.nouveau);
router.post("/rapport/ajout", rapportController.ajout);
router.get("/rapport/detail/:id", rapportController.trouveId);

// router.get("/utilisateur",userController.utilisateur)
// router.get("/utilisateur/ajout",userController.ajout)
// router.post("/utilisateur/ajout",userController.nouveau)
// router.get("/utilisateur/editer/:id",userController.bloquer)
// router.post("/utilisateur/editer/:id",userController.modifier)
// router.get("/utilisateur/supprimer/:id",userController.supprimer)
// router.get("/utilisateur/recherche",userController.recherche)
// router.post("/utilisateur/recherche",userController.filtre)
// =========== Router pour l'interface utilisateur
router.get("/interface", interfaceController.interfaceController);
router.get("/interface/ajout", interfaceController.ajout);
router.post("/interface/ajout", interfaceController.ajoutClient);
router.get("/interface/recherche", interfaceController.rechercher);
router.post("/interface/recherche", interfaceController.filtre);
router.get("/interface/commande", commandeController.interfaceCommande);
router.get("/interface/commande/ajout", commandeController.ajout);
router.post("/interface/commande/ajout", commandeController.nouveau);
router.get("/interface/commande/editer/:id", commandeController.editer);
router.post("/interface/commande/editer/:id", commandeController.modifier);
router.get("/interface/commande/rechercher", commandeController.recherche1);
router.post("/interface/commande/rechercher", commandeController.filtre);
router.get("/interface/expedition", expitionController.interfaceExpedition);
router.get("/interface/expedition/ajout", expitionController.ajout);
router.post("/interface/expedition/ajout", expitionController.nouveau);
router.get("/interface/expedition/editer/:id", expitionController.editer);
router.post("/interface/expedition/editer/:id", expitionController.modifer);

module.exports = router;
