"use strict";
module.exports = (sequelize, DataTypes) => {
  const player = sequelize.define(
    "player",
    {
      name: DataTypes.STRING,
      wins: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: "0"
      }
    },
    {}
  );
  player.associate = function(models) {
    // associations can be defined here
  };
  return player;
};
