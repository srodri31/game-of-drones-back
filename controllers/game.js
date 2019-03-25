const Game = require("../models/").game;
const Player = require("../models/").player;
const PlayerGame = require("../models/").playerGame;
const Round = require("../models/").round;

const { calcGameWinner } = require("../helpers/gameOfDrones");

const create = (req, res) => {
  return Game.create({})
    .then(game => {
      const { players } = req.body;
      console.log(players);
      players.map(playerName => {
        Player.findOne({
          where: { name: playerName }
        })
          .then(player => {
            if (player) {
              PlayerGame.create({ playerId: player.id, gameId: game.id })
                .then(playerGame => {
                  res.status(200).send(game);
                })
                .catch(error => res.status(400).send(error));
            } else {
              Player.create({
                name: playerName
              })
                .then(player =>
                  PlayerGame.create({ playerId: player.id, gameId: game.id })
                    .then(playerGame => {
                      res.status(200).send(game);
                    })
                    .catch(error => res.status(400).send(error))
                )
                .catch(error => res.status(400).send(error));
            }
          })
          .catch(error => res.status(400).send(error));
      });
    })
    .catch(error => res.status(400).send(error));
};

const all = (req, res) => {
  return Game.findAll({
    include: [{ model: Player, as: "players" }, { model: Round, as: "rounds" }]
  })
    .then(games => res.status(200).send(games))
    .catch(error => res.status(400).send(error));
};

const findById = (req, res) => {
  return Game.findOne({
    where: { id: req.params.id },
    include: [{ model: Player, as: "players" }, { model: Round, as: "rounds" }]
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
    .then(gameIsDeleted => {
      let message;
      if (gameIsDeleted) {
        message = "Game has been deleted";
      } else {
        message = "Game could not be deleted";
      }
      res.status(200).send({ message: message });
    })
    .catch(error => res.status(400).send(error));
};

const setWinner = (req, res) => {
  return Game.findOne({
    where: { id: req.params.id },
    include: [{ model: Player, as: "players" }, { model: Round, as: "rounds" }]
  })
    .then(game => {
      if (game) {
        let { rounds } = game;
        rounds = rounds.map(round => {
          return round.toJSON();
        });
        const winnerId = calcGameWinner(rounds);
        PlayerGame.update(
          { isWinner: true },
          { where: { playerId: winnerId, gameId: game.id } }
        )
          .then(playerGameUpdated => {
            res.status(200).send({ winnerId });
          })
          .catch(error => res.status(400).send(error));
      }
    })
    .catch(error => res.status(400).send(error));
};

const getWinner = (req, res) => {
  return PlayerGame.findOne({
    where: { gameId: req.params.id, isWinner: true },
    include: [{ model: Player }]
  })
    .then(playerGame => {
      if (playerGame) {
        const { player } = playerGame.toJSON();
        res.status(200).send(player);
      } else {
        res.status(404).send({
          message: `Winner for game with id ${req.params.id} could not bw found`
        });
      }
    })
    .catch(error => res.status(400).send({ error }));
};

module.exports = {
  create,
  all,
  findById,
  update,
  destroy,
  setWinner,
  getWinner
};
