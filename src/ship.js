class Ship {
    length;
    hitCount = 0;

    constructor(length) {
        this.length = length;
    }

    hit() {
        if (this.isSunk()) return null;
        this.hitCount++;
    }

    isSunk() {
        if (this.hitCount == this.length) return true;
        return false;
    }
}

export { Ship };
