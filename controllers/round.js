const Round = require("../models").round;
const Game = require("../models/").game;
const Player = require("../models/").player;

const { calcRoundWinner } = require("../helpers/gameOfDrones");

const create = (req, res) => {
  const { players } = req.body;
  console.log(req.params);
  let winner = calcRoundWinner(players);
  return Round.create({
    winner: winner.id,
    gameId: req.params.gameId
  })
    .then(round => {
      res.status(200).send(round);
    })
    .catch(error => res.status(400).send(error));
};

const all = (req, res) => {
  return Round.findAll({
    include: [{ model: Player }, { model: Game }]
  })
    .then(rounds => res.status(200).send(rounds))
    .catch(error => res.status(400).send(error));
};

const findById = (req, res) => {
  return Round.findOne({
    where: { id: req.params.id },
    include: [{ model: Player }, { model: Game }]
  })
    .then(round => res.status(200).send(round))
    .catch(error => res.status(400).send(error));
};

const findByGame = (req, res) => {
  return Round.findAll({
    where: { gameId: req.params.gameId },
    include: [{ model: Player }],
    order: [
      // Will escape title and validate DESC against a list of valid direction parameters
      ["createdAt", "ASC"]
    ]
  })
    .then(round => {
      if (round.length > 0) {
        res.status(200).send(round);
      } else {
        res.status(404).send({ message: "There are no rounds for this game" });
      }
    })
    .catch(error => res.status(400).send(error));
};

const update = (req, res) => {
  return Round.update(req.body, { where: { id: req.params.id } })
    .then(round => res.status(200).send(round))
    .catch(error => res.status(400).send(error));
};

const destroy = (req, res) => {
  return Round.destroy({
    where: { id: req.params.id }
  })
    .then(roundIsDeleted => {
      let message;
      if (roundIsDeleted) {
        message = "Round has been deleted";
      } else {
        message = "Round could not be deleted";
      }
      res.status(200).send({ message: message });
    })
    .catch(error => res.status(400).send(error));
};

module.exports = {
  create,
  all,
  findById,
  findByGame,
  update,
  destroy
};
