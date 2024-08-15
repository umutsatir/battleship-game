const Ship = require("./ship");

let ship = new Ship(4);

test("ship can get hit", () => {
    expect(ship.hit()).not.toBe(null);
});

test("can control whether is ship sunk", () => {
    expect(ship.isSunk()).toBe(false);
});
