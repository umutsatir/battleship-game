import { Gameboard } from "./gameboard.js";

class Player {
    constructor(name) {
        this.name = name;
        this.board = new Gameboard();
    }
}

export { Player };
