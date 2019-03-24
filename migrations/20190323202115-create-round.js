"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("rounds", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      winner: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "players",
          key: "id",
          as: "winner"
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
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("rounds");
  }
};
