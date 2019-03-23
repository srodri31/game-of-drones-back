"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("playerGames", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      isWinner: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      playerId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "players",
          key: "id",
          as: "playerId"
        }
      },
      gameId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "games",
          key: "id",
          as: "gameId"
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("playerGames");
  }
};
