import { Gameboard, boardSize } from "./gameboard.js";
import { Game } from "./game.js";

const playerBoardDiv = document.querySelector(".player-board");
const computerBoardDiv = document.querySelector(".computer-board");
const playButton = document.querySelector("#playButton");
const gameOverAlert = document.querySelector("#gameOverAlert");
const gameOverP = document.querySelector("#gameOverP");

let game;
gameOverAlert.style.display = "none";

playButton.addEventListener("click", function () {
    gameOverAlert.style.display = "none";
    game = new Game("player1");
    generateBoards(game.player1.board, game.player2.board);
});

computerBoardDiv.addEventListener("click", function (e) {
    const target = e.target.closest(".cell");
    if (!target) return;
    let isDone = playerMove(target);
    if (isDone) computerMove();
});

function gameOver(player) {
    gameOverAlert.style.display = "block";
    gameOverP.innerHTML = "Game over, winner is " + player.name + ".";
}

function playerMove(target) {
    let classList = Array.from(target.classList);
    if (classList.includes("hit") || classList.includes("hitShip"))
        return false;
    let coordinate = target.dataset.coords.split(",");
    let move = game.play(coordinate);
    console.log(move);
    game.player2.board.showBoard();
    if (move == "hs") target.classList.add("hitShip");
    else if (move == "h") target.classList.add("hit");

    let winner = game.checkWinner();
    if (winner) {
        gameOver(winner);
        return false;
    } else return true;
}

function computerMove() {
    let [move, coordinate] = game.playComputer();
    let cell = null;
    playerBoardDiv.childNodes.forEach((innerCell) => {
        let coordinateCell = innerCell.dataset.coords.split(",");
        if (
            coordinateCell[0] == coordinate[0] &&
            coordinateCell[1] == coordinate[1]
        ) {
            cell = innerCell;
        }
    });
    if (move == "hs") cell.classList.add("hitShip");
    else if (move == "h") cell.classList.add("hit");

    let winner = game.checkWinner();
    if (winner) gameOver(winner);
}

function generateBoards(playerBoard, computerBoard) {
    playerBoardDiv.innerHTML = "";
    computerBoardDiv.innerHTML = "";
    for (let i = 0; i < boardSize; ++i) {
        for (let j = 0; j < boardSize; ++j) {
            let playerCell = document.createElement("div");
            let computerCell = document.createElement("div");
            playerCell.classList.add("cell");
            computerCell.classList.add("cell");
            computerCell.classList.add("computer");
            playerCell.style.width = "2.5rem";
            playerCell.style.height = "2.5rem";
            computerCell.style.width = "2.5rem";
            computerCell.style.height = "2.5rem";
            playerCell.dataset.coords = i + "," + j;
            computerCell.dataset.coords = i + "," + j;
            if (playerBoard.board[i][j] == "s")
                playerCell.classList.add("ship");

            playerBoardDiv.appendChild(playerCell);
            computerBoardDiv.appendChild(computerCell);
        }
    }
}
