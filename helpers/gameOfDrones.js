const { ROCK, SCISSORS } = require("./constants");

const calcRoundWinner = players => {
  let winner = null;
  const player1 = players[0];
  const player2 = players[1];

  if (player1.move === null || player2.move === null) return winner;

  if (player1.move === SCISSORS && player2.move === ROCK) {
    winner = player2;
  } else if (player2.move === SCISSORS && player1.move === ROCK) {
    winner = player1;
  } else if (player1.move.value > player2.move.value) {
    winner = player1;
  } else if (player2.move.value > player1.move.value) {
    winner = player2;
  }

  return winner;
};

const calcGameWinner = rounds => {
  let winner = null;
  if (rounds[0]) {
    winner = rounds[0].winner;
    let winsCount = [];
    winsCount[winner] = 0;
    for (let i = 0; i < rounds.length; i++) {
      if (winsCount[rounds[i].winner]) {
        winsCount[rounds[i].winner]++;
      } else {
        winsCount[rounds[i].winner] = 1;
      }
      if (winsCount[rounds[i].winner] > winsCount[winner]) {
        winner = rounds[i].winner;
      }
    }
  }
  return winner;
};

module.exports = { calcRoundWinner, calcGameWinner };
