const Player = require("../models/").player;

module.exports = {
  create(req, res) {
    return Player.create({
      name: req.body.name
    })
      .then(player => res.status(200).send(player))
      .catch(error => res.status(400).send(error));
  },
  all(req, res) {
    return Player.findAll()
      .then(players => res.status(200).send(players))
      .catch(error => res.status(400).send(error));
  },
  findById(req, res) {
    return Player.findOne({ id: req.params.id })
      .then(player => res.status(200).send(player))
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Player.update(req.body, { where: { id: req.params.id } })
      .then(player => res.status(200).send(player))
      .catch(error => res.status(400).send(error));
  },
  delete(req, res) {
    return Player.destroy({
      where: { id: req.params.id }
    })
      .then(playerIsDeleted => {
        let message;
        if (playerIsDeleted) {
          message = "Player has been deleted";
        } else {
          message = "Player could not be deleted";
        }
        res.status(200).send({ message: message });
      })
      .catch(error => res.status(400).send(error));
  }
};
