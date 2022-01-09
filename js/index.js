let gameBoard = document.getElementById("gameBoard");
const gameAudio = new Audio("../music/music.mp3");
const eatFoodAudio = new Audio("../music/food.mp3");
const snakeMoveAudio = new Audio("../music/move.mp3");
const gameOverAudio = new Audio("../music/gameover.mp3");
let scoreBox = document.getElementById("scoreBox");
let highScoreBox = document.getElementById("highScoreBox");
let lastPaintTime = 0;
let speed = 10;
let score = 0;
let highScore = localStorage.getItem("highScore");
let lastKeyPressed;

if (highScore == null) {
    localStorage.setItem("highScore", JSON.stringify(0));
}
else {
    highScore = JSON.parse(highScore);
}
let pauseGame = false;




let snakeArray = [
    {
        x: 13,
        y: 14
    }// initial position of snake head in grid
];
let snakeDirection =
{
    x: 0,
    y: 0
};// initial position of Food of snake

let snakeFoodPosition = {
    x: Math.round(2 + (18 - 2) * Math.random()),
    y: Math.round(2 + (18 - 2) * Math.random()),
}; // Snake Food Initial position
function mainControllerOfGame(cTime) {
    window.requestAnimationFrame(mainControllerOfGame);
    if ((cTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = cTime;
    console.log("Paint", cTime);
    if (!pauseGame) {
        gameEngine();
    }
}
window.requestAnimationFrame(mainControllerOfGame);

function isCollide() {
    if (snakeArray[0].x < 0 || snakeArray[0].x >= 19 || snakeArray[0].y < 0 || snakeArray[0].y >= 19) {
        return true;
    }
    for (let i = 1; i < snakeArray.length; i++) {
        const element = snakeArray[i];
        if (snakeArray[0].x === element.x && snakeArray[0].y === element.y)
            return true;
    }
    // console.log(snakeArray[0].x,snakeArray[0].y);
    return false;
}
function gameEngine() {
    // Create the Snake Body After Eating the food...
    if (isCollide()) {
        gameOverAudio.play();
        gameAudio.pause();
        snakeArray = [
            {
                x: 13,
                y: 14
            }// initial position of snake head in grid
        ];
        snakeDirection =
        {
            x: 0,
            y: 0
        };//
        if (score > highScore) {
            localStorage.setItem("highScore", JSON.stringify(score));
            highScore = score;
        }
        score = 0;
        alert("GameOver");
    }
    // Generting New Food After Eat 
    let foodInSnakeBody;
    if (snakeArray[0].x === snakeFoodPosition.x && snakeArray[0].y === snakeFoodPosition.y) {
        eatFoodAudio.play();
        snakeArray.unshift({ x: snakeArray[0].x + snakeDirection.x, y: snakeArray[0].y + snakeDirection.y });
        do {
            foodInSnakeBody = 0;
            snakeFoodPosition = {
                x: Math.round(2 + (18 - 2) * Math.random()),
                y: Math.round(2 + (18 - 2) * Math.random()),
            }
            snakeArray.forEach(element => {
                if (element.x == snakeFoodPosition.x && element.y == snakeFoodPosition.y)
                    foodInSnakeBody++;
            });
        } while (foodInSnakeBody != 0);
        score++;
    }
    // // Generate New Food 

    // if(snakeArray)

    // Moving the snake
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i + 1] = { ...snakeArray[i] };
        console.log(snakeArray[i + 1]);
    }

    // Display the Snake 
    snakeArray[0].x += snakeDirection.x;
    snakeArray[0].y += snakeDirection.y;
    gameBoard.innerHTML = "";
    for (let i = 0; i < snakeArray.length; i++) {
        let snakeElement = document.createElement("div");
        if (i === 0)
            snakeElement.classList.add("snakeHead");
        else
            snakeElement.classList.add("snakeBody");
        snakeElement.style.gridRowStart = snakeArray[i].y;
        snakeElement.style.gridColumnStart = snakeArray[i].x;
        gameBoard.appendChild(snakeElement);
    }
    // Update the score and High Score
    scoreBox.innerText = `Score : ${score}`
    if (highScore > score)
        highScoreBox.innerText = `High Score : ${highScore}`
    else
        highScoreBox.innerText = `High Score : ${score}`


    // Display the Food 
    let snakeFood = document.createElement("div");
    snakeFood.classList.add("snakeFood");
    snakeFood.style.gridRowStart = snakeFoodPosition.y;
    snakeFood.style.gridColumnStart = snakeFoodPosition.x;
    gameBoard.appendChild(snakeFood);
}
let upperMobileButton = document.getElementById("upperMobileButton");
let leftMobileButton = document.getElementById("leftMobileButton");
let rightMobileButton = document.getElementById("rightMobileButton");
let downMobileButton = document.getElementById("downMobileButton");

upperMobileButton.addEventListener("click", () => {
    if (lastKeyPressed !== "down" || snakeArray.length===1) {
        snakeDirection.x = 0;
        snakeDirection.y = -1;
        lastKeyPressed = "up";
    }
});
leftMobileButton.addEventListener("click", () => {
    if (lastKeyPressed !== "right"|| snakeArray.length===1 ) {
        snakeDirection.x = -1;
        snakeDirection.y = 0;
        lastKeyPressed = "left";
    }
});
rightMobileButton.addEventListener("click", () => {
    if (lastKeyPressed !== "left" || snakeArray.length===1) {
        snakeDirection.x = 1;
        snakeDirection.y = 0;
        lastKeyPressed = "right";
    }
});
downMobileButton.addEventListener("click", () => {
    if (lastKeyPressed !== "up" || snakeArray.length===1) {
        snakeDirection.x = 0;
        snakeDirection.y = 1;
        lastKeyPressed = "down";
    }
});
function pauseResume(){
    pauseGame = (pauseGame) ? false : true;
            if (pauseGame)
                gameAudio.pause();
            else
                gameAudio.play();
}
document.querySelector("#pauseBtnContainer button").addEventListener("click",pauseResume);
document.addEventListener("keydown", (e) => {
    // snakeDirection = { x: 0, y: 1 };
    // snakeMoveAudio.play();
    gameAudio.play();
    switch (e.key) {
        case "ArrowUp":
            if (lastKeyPressed !== "down" || snakeArray.length===1) {
                snakeDirection.x = 0;
                snakeDirection.y = -1;
                lastKeyPressed = "up";
            }
            break;
        case "ArrowDown":
            if (lastKeyPressed !== "up" || snakeArray.length===1) {
                snakeDirection.x = 0;
                snakeDirection.y = 1;
                lastKeyPressed = "down";
            }
            break;
        case "ArrowLeft":
            if (lastKeyPressed !== "right" || snakeArray.length===1) {
                snakeDirection.x = -1;
                snakeDirection.y = 0;
                lastKeyPressed = "left";
            }

            break;
        case "ArrowRight":
            if (lastKeyPressed !== "left" || snakeArray.length===1) {
                snakeDirection.x = 1;
                snakeDirection.y = 0;
                lastKeyPressed = "right";
            }
            break;
        case " ":
            pauseResume;
            console.log(gamepause);
            break;
        default:
            break;
    }

})