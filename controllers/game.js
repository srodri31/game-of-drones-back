const Game = require("../models/").game;
const Player = require("../models/").player;
const PlayerGame = require("../models/").playerGame;

const create = (req, res) => {
  return Game.create({})
    .then(game => {
      const { players } = req.body;
      players.map(playerName => {
        Player.findOne({
          where: { name: playerName }
        })
          .then(player => {
            if (player) {
              PlayerGame.create({ playerId: player.id, gameId: game.id });
            } else {
              Player.create({
                name: playerName
              })
                .then(player =>
                  PlayerGame.create({ playerId: player.id, gameId: game.id })
                )
                .catch(error => res.status(400).send(error));
            }
          })
          .catch(error => res.status(400).send(error));
      });
      res.status(200).send(game);
    })
    .catch(error => res.status(400).send(error));
};

const all = (req, res) => {
  return Game.findAll({
    include: [{ model: Player, as: "players" }]
  })
    .then(players => res.status(200).send(players))
    .catch(error => res.status(400).send(error));
};

const findById = (req, res) => {
  return Game.findOne({
    where: { id: req.params.id },
    include: [{ model: Player, as: "players" }]
  })
    .then(game => res.status(200).send(game))
    .catch(error => res.status(400).send(error));
};

const update = (req, res) => {
  return Game.update(req.body, { where: { id: req.params.id } })
    .then(game => res.status(200).send(game))
    .catch(error => res.status(400).send(error));
};

const destroy = (req, res) => {
  return Game.destroy({
    where: { id: req.params.id }
  })
    .then(playerIsDeleted => {
      let message;
      if (playerIsDeleted) {
        message = "Game has been deleted";
      } else {
        message = "Game could not be deleted";
      }
      res.status(200).send({ message: message });
    })
    .catch(error => res.status(400).send(error));
};

module.exports = {
  create,
  all,
  findById,
  update,
  destroy
};
