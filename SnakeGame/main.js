const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 600;
let snake, prey;

function createElement() {
    snake = new Snake(3);
    prey = new Prey(5, 5);
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

addEventListener("keydown", function (e) {
    if (snake.snakeHead.status === "NONE") {
        if (e.keyCode == 13) {
            document.getElementById('guide').style.display = 'none';
            snake.snakeHead.status = "RIGHT";
            snake.snakeBody.forEach(obj => {
                obj.status = "RIGHT";
            });
            snake.snakeTail.status = "RIGHT";
            snake.count = 0;
        }
    }
    else {
        if (snake.count >= 10 && (snake.snakeHead.status === "LEFT" || snake.snakeHead.status === "RIGHT")) {
            if (e.keyCode == 40) {
                snake.count = 0;
                snake.snakeHead.preStatus = snake.snakeHead.status;
                snake.snakeHead.status = "DOWN";
                snake.saveToTheMovePoints(snake.snakeHead);
            }
            else if (e.keyCode == 38) {
                snake.count = 0;
                snake.snakeHead.preStatus = snake.snakeHead.status;
                snake.snakeHead.status = "UP";
                snake.saveToTheMovePoints(snake.snakeHead);
            }
        }
        if (snake.count >= 10 && (snake.snakeHead.status === "UP" || snake.snakeHead.status === "DOWN")) {
            if (e.keyCode == 37) {
                snake.count = 0;
                snake.snakeHead.preStatus = snake.snakeHead.status;
                snake.snakeHead.status = "LEFT";
                snake.saveToTheMovePoints(snake.snakeHead);
            }
            else if (e.keyCode == 39) {
                snake.count = 0;
                snake.snakeHead.preStatus = snake.snakeHead.status;
                snake.snakeHead.status = "RIGHT";
                snake.saveToTheMovePoints(snake.snakeHead);
            }
        }
    }
});

function animate() {
    let action = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.move();

    prey.draw();
    if (snake.isKillPrey(prey)) {
        prey.box_x = random(1, 30);
        prey.box_y = random(1, 30);
    }
    if (snake.isBiteSelf() || snake.snakeHead.box_x < 1 || snake.snakeHead.box_x > 30 || snake.snakeHead.box_y < 1 || snake.snakeHead.box_y > 30) {
        cancelAnimationFrame(action);
        document.getElementById('finish').style.display = 'inline-block';
        document.getElementById('score').innerHTML = snake.bodyLength + 2 - snake.length;
    }
    snake.drawScore();
}

document.getElementById('start-game').onclick = () => {
    document.getElementById('start').style.display = 'none';
    document.getElementById('guide').style.display = 'inline-block';
}

document.getElementById('exit-guide').onclick = () => {
    document.getElementById('guide').style.display = 'none';
    createElement();
    animate();
}

document.getElementById('restart-game').onclick = () => {
    document.getElementById('finish').style.display = 'none';
    createElement();
    animate();
}

document.getElementById('exit-game').onclick = () => {
    document.getElementById('finish').style.display = 'none';
    document.getElementById('start').style.display = 'inline-block';
    createElement();
    animate();
}
