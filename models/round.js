"use strict";
module.exports = (sequelize, DataTypes) => {
  const round = sequelize.define("round", {}, {});
  round.associate = function(models) {
    // associations can be defined here
    round.belongsTo(models.player, {
      foreignKey: "winner",
      onDelete: "CASCADE"
    });
    round.belongsTo(models.game, {
      foreignKey: "gameId",
      onDelete: "CASCADE"
    });
  };
  return round;
};
