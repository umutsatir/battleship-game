import { Ship } from "./ship.js";

const boardSize = 10;

function getRandomCoordinates(size, horizontal = true) {
    const x = Math.floor(Math.random() * boardSize);
    const y = Math.floor(Math.random() * boardSize);

    let coordinates = [];
    for (let i = 0; i < size; i++) {
        if (horizontal) {
            if (y + i < boardSize) {
                coordinates.push([x, y + i]);
            } else {
                return getRandomCoordinates(size, horizontal); // Retry if out of bounds
            }
        } else {
            if (x + i < boardSize) {
                coordinates.push([x + i, y]);
            } else {
                return getRandomCoordinates(size, horizontal); // Retry if out of bounds
            }
        }
    }
    return coordinates;
}

class Gameboard {
    board;
    ships = [];
    #hit = "h";
    #hitShip = "hs";
    #ship = "s";
    #miss = "m";

    constructor() {
        this.setupBoard();
        let ships = [
            new Ship(4),
            new Ship(3),
            new Ship(3),
            new Ship(2),
            new Ship(2),
            new Ship(2),
            new Ship(1),
            new Ship(1),
            new Ship(1),
            new Ship(1),
        ];

        ships.forEach((ship) => {
            let isHorizontal = Math.random() > 0.5; // randomly select ship direction
            this.placeShip(ship, isHorizontal);
        });
    }

    setupBoard() {
        this.board = new Array(boardSize);
        for (let i = 0; i < boardSize; i++) {
            this.board[i] = new Array(boardSize).fill(undefined); // Initialize each row with an array filled with 'undefined'
        }
    }

    isAlreadyHit(coordinate) {
        return (
            this.board[coordinate[0]][coordinate[1]] == this.#hit ||
            this.board[coordinate[0]][coordinate[1]] == this.#miss
        );
    }

    placeShip(ship, isHorizontal) {
        let coordinates;
        do {
            coordinates = getRandomCoordinates(ship.length, isHorizontal);
        } while (!this.canPlaceShip(coordinates));

        coordinates.forEach((coordinate) => {
            this.board[coordinate[0]][coordinate[1]] = this.#ship;
        });
        this.ships.push([ship, coordinates]);
    }

    canPlaceShip(coordinates) {
        for (const [x, y] of coordinates) {
            if (
                x < 0 ||
                x >= 10 ||
                y < 0 ||
                y >= 10 ||
                this.board[x][y] !== undefined
            ) {
                return false;
            }
        }

        const directions = [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, -1],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1],
        ];

        for (const [x, y] of coordinates) {
            for (const [dx, dy] of directions) {
                const nx = x + dx;
                const ny = y + dy;

                if (
                    nx >= 0 &&
                    nx < 10 &&
                    ny >= 0 &&
                    ny < 10 &&
                    this.board[nx][ny] == this.#ship
                ) {
                    return false;
                }
            }
        }

        return true;
    }

    isAllShipsSunk() {
        return this.ships.every((ship) => ship[0].isSunk());
    }

    receiveAttack(coordinate) {
        if (this.isAlreadyHit(coordinate)) return "x";
        let hitShip = this.findShip(coordinate);
        console.log(hitShip);
        if (hitShip != null) {
            hitShip.hit();
            this.board[coordinate[0]][coordinate[1]] = this.#hit;
            return this.#hitShip;
        } else {
            this.board[coordinate[0]][coordinate[1]] = this.#miss;
            return this.#hit;
        }
    }

    findShip(coordinate) {
        for (let [ship, shipCoordinates] of this.ships) {
            if (
                shipCoordinates.some(
                    ([x, y]) => x == coordinate[0] && y == coordinate[1]
                )
            ) {
                return ship;
            }
        }
        return null;
    }

    showBoard() {
        let boardString = "";
        for (let i = 0; i < boardSize; ++i) {
            for (let j = 0; j < boardSize; ++j) {
                if (this.board[i][j] == undefined) boardString += "| ";
                else boardString += "|" + this.board[i][j];
            }
            boardString += "|\n";
        }
        console.log(boardString);
    }
}

export { Gameboard, boardSize };
