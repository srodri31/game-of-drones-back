var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var players = require("./routes/players");
let games = require("./routes/games");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const models = require("./models");
models.sequelize
  .sync()
  .then(() => {
    console.log("Database working fine");
  })
  .catch(err => {
    console.log(err, "Something went worn with database update");
  });

app.use("/api/v1/players", players);
app.use("/api/v1/games", games);

module.exports = app;
