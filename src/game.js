import { Player } from "./player.js";

class Game {
    player1;
    player2;

    constructor(name) {
        this.player1 = new Player(name);
        this.player2 = new Player("computer");
    }

    play(coordinate) {
        return this.player2.board.receiveAttack(coordinate);
    }

    playComputer() {
        let coordinate = [];
        do {
            coordinate = [
                Math.floor(Math.random() * 10),
                Math.floor(Math.random() * 10),
            ];
        } while (this.player1.board.isAlreadyHit(coordinate));
        let move = this.player1.board.receiveAttack(coordinate);
        return [move, coordinate];
    }

    checkWinner() {
        if (this.player1.board.isAllShipsSunk()) return this.player2;
        else if (this.player2.board.isAllShipsSunk()) return this.player1;
        else return null;
    }
}

export { Game };
