"use strict";

//selecting of element
const player0El = document.querySelector(".section-1");
const player1El = document.querySelector(".section-2");
const score1 = document.querySelector("#score-0");
const score2 = document.querySelector("#score-1");
const diceEl = document.querySelector(".dice");
const btnRestart = document.querySelector(".reset");
const btnRoll = document.querySelector(".roll");
const btnHold = document.querySelector(".hold");
const current1El = document.getElementById("current-0");
const current2El = document.getElementById("current-1");

// starting condition

score1.textContent = 0;
score2.textContent = 0;
diceEl.classList.add("hidden");

const score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let player = true;

const switchPlayer = function () {
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player-active");
  player1El.classList.toggle("player-active");
};

//rolling dice functionality
btnRoll.addEventListener("click", function () {
  // 1.Generating Random number
  const dice = Math.trunc(Math.random() * 6) + 1;
  if (player) {
    // 2.Disply dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // 3.Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  // 1. Add current score to the active player
  if (player) {
    score[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent =
      score[activePlayer];

    //2. Check if player's score is >= 100
    if (score[activePlayer] >= 20) {
      //finish the game
      diceEl.classList.add("hidden");
      player = false;
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add("player-winner");
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove("player-active");
    } else {
      //3.Switch to the next
      switchPlayer();
    }
  }
});

btnRestart.addEventListener("click", function () {
  diceEl.classList.add("hidden");
  current1El.textContent = current2El.textContent = 0;
  score1.textContent = score2.textContent = 0;
  document.querySelector(`.player-1`).classList.add("player-active");
  document.querySelector(`.player-1`).classList.remove("player-active");
  document
    .querySelector(`.player-${activePlayer}`)
    .classList.remove("player-winner");
  player = true;
  currentScore = 0;
});
