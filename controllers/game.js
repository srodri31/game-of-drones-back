const Game = require("../models/").game;
const Player = require("../models/").player;

module.exports = {
  create(req, res) {
    return Game.create({
      winner: req.body.winner
    })
      .then(game => res.status(200).send(game))
      .catch(error => res.status(400).send(error));
  },
  all(req, res) {
    return Game.findAll()
      .then(players => res.status(200).send(players))
      .catch(error => res.status(400).send(error));
  },
  findById(req, res) {
    return Game.findOne({
      where: { id: req.params.id },
      include: [{ model: Player }]
    })
      .then(game => res.status(200).send(game))
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Game.update(req.body, { where: { id: req.params.id } })
      .then(game => res.status(200).send(game))
      .catch(error => res.status(400).send(error));
  },
  delete(req, res) {
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
  }
};
