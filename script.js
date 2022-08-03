"use strict";

//managing scores
let score1Display = document.querySelector(".score-1");
let score2Display = document.querySelector(".score-2");
let score1 = 0;
let score2 = 0;
let currentScore1Display = document.querySelector(".current-score-1");
let currentScore2Display = document.querySelector(".current-score-2");
let currentScore1 = 0;
let currentScore2 = 0;
//managing buttons
let btnNewGame = document.querySelector(".btn-new-game");
let btnRollDice = document.querySelector(".btn-roll-dice");
let btnHold = document.querySelector(".btn-hold");
//managing section backgrounds
let leftSection = document.querySelector(".left-section");
let rightSection = document.querySelector(".right-section");
//managing other variables
let dice;
let activePlayer = 1;
//implementing game logic
const newGame = function () {
    activePlayer = 1;
    dice = 0;
    score1 = 0;
    score2 = 0;
    currentScore1 = 0;
    currentScore2 = 0;
    score1Display.textContent = "0";
    score2Display.textContent = "0";
    currentScore1Display.textContent = "0";
    currentScore2Display.textContent = "0";
    leftSection.classList.add("section-active");
    rightSection.classList.remove("section-active");
    rightSection.classList.remove("section-won");
    leftSection.classList.remove("section-won");
    rightSection.classList.remove("section-lost");
    leftSection.classList.remove("section-lost");
    btnRollDice.disabled = false;
    btnRollDice.style.cursor = "pointer";
    btnHold.disabled = false;
    btnHold.style.cursor = "pointer";
};
const switchToPlayer = function (player) {
    switch (player) {
        case 1:
            rightSection.classList.remove("section-active");
            leftSection.classList.add("section-active");
            activePlayer = 1;
            break;
        case 2:
            leftSection.classList.remove("section-active");
            rightSection.classList.add("section-active");
            activePlayer = 2;
            break;
    }
};
const playerWon = function (player) {
    leftSection.classList.remove("section-active");
    rightSection.classList.remove("section-active");
    btnRollDice.disabled = true;
    btnRollDice.style.cursor = "default";
    btnHold.disabled = true;
    btnHold.style.cursor = "default";
    switch (player) {
        case 1:
            leftSection.classList.add("section-won");
            rightSection.classList.add("section-lost");
            break;
        case 2:
            rightSection.classList.add("section-won");
            leftSection.classList.add("section-lost");
            break;
    }
};

newGame();
//rolling the dice
btnRollDice.addEventListener("click", () => {
    dice = Math.trunc(Math.random() * 6 + 1);
    console.log(dice);
    switch (activePlayer) {
        case 1:
            if (dice == 1) {
                currentScore1 = 0;
                switchToPlayer(2);
            } else {
                currentScore1 += dice;
            }
            currentScore1Display.textContent = currentScore1;
            break;
        case 2:
            if (dice == 1) {
                currentScore2 = 0;
                switchToPlayer(1);
            } else {
                currentScore2 += dice;
            }
            currentScore2Display.textContent = currentScore2;
            break;
    }
});
//holding points
btnHold.addEventListener("click", () => {
    switch (activePlayer) {
        case 1:
            score1 = currentScore1 + score1;
            currentScore1 = 0;
            score1Display.textContent = score1;
            currentScore1Display.textContent = currentScore1;
            if (score1 >= 100) {
                playerWon(1);
            } else switchToPlayer(2);
            break;
        case 2:
            score2 = currentScore2 + score2;
            currentScore2 = 0;
            score2Display.textContent = score2;
            currentScore2Display.textContent = currentScore2;
            if (score2 >= 100) {
                playerWon(2);
            } else switchToPlayer(1);
            break;
    }
});
//starting new game
btnNewGame.addEventListener("click", () => {
    newGame();
});
