const express = require("express");
const route = require("./routes/route");
const bodyParser = require("body-parser");
const app = express();
const session = require("express-session");
const port = process.env.PORT || 4000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "simon08@#nodejs*********pierre",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(route);

//======= Middleware permettant de vérifier si l'utilisateur est connécté
app.use((req, res, next) => {
  if (req.session.email) {
    next();
  } else {
    res.redirect("/");
  }
});
// app.use((req,res)=>{
//       res.render("404")
// })

//======== Rendu vers une ressource ou page introuvable
app.all(/.*/, (req, res) => {
  res.render("404");
});

// app.use((req,res)=>{
//       res.render("404")
// })

//======== Démarrage du serveur sur le port 4000
app.listen(port, () => {
  console.log(`Démarrage du serveur sur le port http://localhost:${port}`);
});
