const N = 20;
const SPEED = 2;

class Object {
    constructor(x, y) {
        this.side = N;
        this.x = (x - 1) * this.side;
        this.box_x = x;
        this.y = (y - 1) * this.side;
        this.box_y = y;
        this.status = "NONE";
        this.color = "yellow";
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x + this.side / 2, this.y + this.side / 2, this.side / 2, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
    }

    move() {
        if (this.status === "RIGHT") {
            this.x += SPEED;
            if (this.x % this.side === 0) this.box_x = this.x / this.side + 1;
            else this.box_x = Math.floor(this.x / this.side) + 2;
        }
        else if (this.status === "LEFT") {
            this.x -= SPEED;
            if (this.x % this.side === 0) this.box_x = this.x / this.side + 1;
            else this.box_x = Math.floor(this.x / this.side) + 1;
        }
        else if (this.status === "UP") {
            this.y -= SPEED;
            if (this.y % this.side === 0) this.box_y = this.y / this.side + 1;
            else this.box_y = Math.floor(this.y / this.side) + 1;
        }
        else if (this.status === "DOWN") {
            this.y += SPEED;
            if (this.y % this.side === 0) this.box_y = this.y / this.side + 1;
            else this.box_y = Math.floor(this.y / this.side) + 2;
        }
    }
}

class SpeicalObject extends Object {
    constructor(x, y, color) {
        super(x, y);
        this.color = color;
        this.preStatus = "NONE";
    }

    move() {
        if (this.status === "RIGHT") {
            if (this.y % this.side === 0) this.x += SPEED;
            else this.specialMove();
            if (this.x % this.side === 0) this.box_x = this.x / this.side + 1;
            else this.box_x = Math.floor(this.x / this.side) + 2;
        }
        else if (this.status === "LEFT") {
            if (this.y % this.side === 0) this.x -= SPEED;
            else this.specialMove();
            if (this.x % this.side === 0) this.box_x = this.x / this.side + 1;
            else this.box_x = Math.floor(this.x / this.side) + 1;
        }
        else if (this.status === "UP") {
            if (this.x % this.side === 0) this.y -= SPEED;
            else this.specialMove();
            if (this.y % this.side === 0) this.box_y = this.y / this.side + 1;
            else this.box_y = Math.floor(this.y / this.side) + 1;
        }
        else if (this.status === "DOWN") {
            if (this.x % this.side === 0) this.y += SPEED;
            else this.specialMove();
            if (this.y % this.side === 0) this.box_y = this.y / this.side + 1;
            else this.box_y = Math.floor(this.y / this.side) + 2;
        }
    }

    specialMove() {
        if (this.preStatus === "RIGHT") {
            this.x += SPEED;
        }
        else if (this.preStatus === "LEFT") {
            this.x -= SPEED;
        }
        else if (this.preStatus === "UP") {
            this.y -= SPEED;
        }
        else if (this.preStatus === "DOWN") {
            this.y += SPEED;
        }
    }

    isContactStaticObject(Obj) {
        return (this.box_x === Obj.box_x && this.box_y === Obj.box_y);
    }

    isContactDynamicObject(Obj) {
        return (Math.sqrt(Math.pow(this.x - Obj.x, 2) + Math.pow(this.y - Obj.y, 2)) < (this.side / 2 + Obj.side / 2));
    }
}

class Prey extends Object {
    constructor(x, y) {
        super(x, y);
        this.color = "White";
        this.side = N / 2;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect((this.box_x - 1) * N + this.side / 2, (this.box_y - 1) * N + this.side / 2, this.side, this.side);
    }
}

class Snake {
    constructor(length) {
        this.snakeHead = new SpeicalObject(3, 1, "red");
        this.snakeTail = new SpeicalObject(3 - length + 1, 1, "yellow");
        this.length = length;
        this.bodyLength = length - 2;
        this.snakeBody = [];
        for (let i = 1; i <= this.bodyLength; i++) {
            this.snakeBody.push(new Object(3 - i, 1));
        }
        this.theMovePoints = [];
        this.storePreys = 0;
        this.count = 0;
    }

    saveToTheMovePoints(Obj) {
        let point = new Object(0, 0);
        if (Obj.preStatus === "RIGHT") {
            if (Obj.x % Obj.side === 0) point.x = Math.floor(Obj.x / Obj.side) * Obj.side;
            else point.x = (Math.floor(Obj.x / Obj.side) + 1) * Obj.side;
            point.y = Obj.y;
        }
        else if (Obj.preStatus === "LEFT") {
            point.x = Math.floor(Obj.x / Obj.side) * Obj.side;
            point.y = Obj.y;
        }
        else if (Obj.preStatus === "DOWN") {
            point.x = Obj.x;
            if (Obj.y % Obj.side === 0) point.y = Math.floor(Obj.y / Obj.side) * Obj.side;
            else point.y = (Math.floor(Obj.y / Obj.side) + 1) * Obj.side;
        }
        else if (Obj.preStatus === "UP") {
            point.x = Obj.x;
            point.y = Math.floor(Obj.y / Obj.side) * Obj.side;
        }
        point.status = Obj.status;
        this.theMovePoints.push(point);
    }

    draw() {
        ctx.beginPath();
        this.snakeHead.draw();
        for (let i = this.bodyLength - 1; i >= 0; i--) {
            this.snakeBody[i].draw();
        }
        this.snakeTail.draw();
    }

    move() {
        this.count++;
        this.snakeHead.move();
        this.snakeBody.forEach(obj1 => {
            if (this.theMovePoints.length !== 0) {
                for (let obj2 of this.theMovePoints) {
                    if (obj2.x === obj1.x && obj2.y === obj1.y) {
                        obj1.status = obj2.status;
                        break;
                    }
                };
            }
            obj1.move();
        });
        if (this.theMovePoints.length !== 0) {
            for (let obj of this.theMovePoints) {
                if (obj.x === this.snakeTail.x && obj.y === this.snakeTail.y) {
                    this.snakeTail.preStatus = this.snakeTail.status;
                    this.snakeTail.status = obj.status;
                    this.theMovePoints.splice(0, 1);
                }
            };
        }
        this.snakeTail.move();

        if (this.storePreys > 0 && this.snakeTail.status === this.snakeBody[this.bodyLength - 1].status) {
            this.increaseBody();
            this.storePreys--;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.draw();
    }

    increaseBody() {
        let point = new Object(0, 0);
        this.bodyLength++;
        point.x = this.snakeTail.x;
        point.y = this.snakeTail.y;
        point.status = this.snakeTail.status;
        this.snakeBody.push(point);
        this.snakeTail.x -= this.snakeBody[this.bodyLength - 2].x - this.snakeBody[this.bodyLength - 1].x;
        this.snakeTail.y -= this.snakeBody[this.bodyLength - 2].y - this.snakeBody[this.bodyLength - 1].y;
    }

    isBiteSelf() {
        for(let i = 2; i < this.bodyLength - 1; i++) {
            if(this.snakeHead.isContactDynamicObject(this.snakeBody[i])) {
                return true;
            }
        }
        if (this.bodyLength > 1 && this.snakeHead.isContactDynamicObject(this.snakeTail)) {
            return true;
        }
        return false

    }

    isKillPrey(obj) {
        if (this.snakeHead.isContactStaticObject(obj)) {
            this.storePreys++;
            return true;
        }
        return false;
    }

    drawScore() {
        ctx.fillStyle = 'Black';
        ctx.font = "20px Arial";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.bodyLength + 2 - this.length, canvas.width * 0.035, canvas.height * 0.97);
    }
}
