"use strict";
module.exports = (sequelize, DataTypes) => {
  const playerGame = sequelize.define(
    "playerGame",
    {
      isWinner: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {}
  );
  playerGame.associate = function(models) {
    // associations can be defined here
    playerGame.belongsTo(models.player, {
      foreignKey: "playerId",
      onDelete: "CASCADE"
    });
    playerGame.belongsTo(models.game, {
      foreignKey: "gameId",
      onDelete: "CASCADE"
    });
  };
  return playerGame;
};
