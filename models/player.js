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
    player.hasMany(models.game, {
      foreignKey: "winner",
      as: "games"
    });
  };
  return player;
};
