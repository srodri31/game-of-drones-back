"use strict";
module.exports = (sequelize, DataTypes) => {
  const game = sequelize.define("game", {}, {});
  game.associate = function(models) {
    // associations can be defined here
    game.belongsToMany(models.player, {
      through: models.playerGame,
      foreignKey: "gameId",
      as: "players"
    });
  };
  return game;
};
