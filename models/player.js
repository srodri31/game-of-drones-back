"use strict";
module.exports = (sequelize, DataTypes) => {
  const player = sequelize.define(
    "player",
    {
      name: DataTypes.STRING
    },
    {}
  );
  player.associate = function(models) {
    // associations can be defined here
    player.belongsToMany(models.game, {
      through: models.playerGame,
      foreignKey: "playerId",
      as: "games"
    });
  };
  return player;
};
