import { Gameboard } from "./gameboard";

let gameboard = new Gameboard();

describe("can show the board", () => {
    gameboard.showBoard();
});

test("can receive an attack", () => {
    expect(gameboard.receiveAttack([1, 1])).toBeDefined();
});

test("can check if all ships sunk", () => {
    expect(gameboard.isAllShipsSunk()).toBeDefined();
});
