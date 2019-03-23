"use strict";
module.exports = (sequelize, DataTypes) => {
  const game = sequelize.define("game", {}, {});
  game.associate = function(models) {
    // associations can be defined here
    game.belongsTo(models.player, {
      foreignKey: "winner",
      onDelete: "CASCADE"
    });
  };
  return game;
};
