import { defineDirection, verifyCoordinates } from "./movements.js";
import { draw as drawFunction, draw } from "./draw.js";

const canvasHtmlPlaceHolder = document.getElementById("canvas-container");
let gameInterval;
const _initialState = () => {
  return {
    snakeArray: [
      { x: 300, y: 240 },
      { x: 280, y: 240 },
      { x: 260, y: 240 },
      { x: 240, y: 240 },
      { x: 220, y: 220 },
    ],
    movementData: {
      actualDirectionKeyCode: 39,
      xAugmenter: 20,
      yAugmenter: 0,
    },
    foodCoo: { x: 0, y: 0 },
    interval: 150,
  };
};

let State = { ..._initialState() };

function move() {
  const newX = State.snakeArray[0].x + State.movementData.xAugmenter;
  const newY = State.snakeArray[0].y + State.movementData.yAugmenter;
  const head = {
    ...verifyCoordinates(newX, newY),
  };
  State.snakeArray.unshift(head);
  State.snakeArray.pop();
}

function changeDirection(event) {
  const newDIr = defineDirection(
    event.keyCode,
    State.movementData.xAugmenter,
    State.movementData.yAugmenter,
    State.movementData.actualDirectionKeyCode
  );
  State.movementData.xAugmenter = newDIr.x;
  State.movementData.yAugmenter = newDIr.y;
  State.movementData.actualDirectionKeyCode = newDIr.newDirCode;
}

function randomizeFood() {
  let newX = Math.floor((Math.floor(Math.random() * 560) + 20) / 10);
  newX % 2 === 0 ? null : newX++;
  newX *= 10;
  let newY = Math.floor((Math.floor(Math.random() * 560) + 20) / 10);
  newY % 2 === 0 ? null : newY++;
  newY *= 10;
  State.foodCoo = { x: newX, y: newY };
}
randomizeFood();

function checkIfHasEaten() {
  if (
    State.snakeArray[0].x === State.foodCoo.x &&
    State.snakeArray[0].y === State.foodCoo.y
  ) {
    setTimeout(() => {
      extendSnake();
    }, 100);
    randomizeFood();
  }
}

function checkAutoEat(snake) {
  const head = snake[0];
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      confirm("Dead...Retry?") ? clearGame() : stopGame();
    }
  }
}

function extendSnake() {
  let snakeCopy = [...State.snakeArray];
  const lastPiece = snakeCopy[snakeCopy.length - 1];
  snakeCopy.push({
    x: lastPiece.x - 20,
    y: lastPiece.y - 20,
  });
  State.snakeArray = [...snakeCopy];
}

document.addEventListener("keyup", changeDirection);


function clearGame() {
  clearInterval(gameInterval);
  State = { ..._initialState() };
  randomizeFood();
  startGame();
}

function startGame() {
  gameInterval = setInterval(() => {
    canvasHtmlPlaceHolder.innerHTML = "";
    move();
    checkAutoEat(State.snakeArray);
    checkIfHasEaten();
    canvasHtmlPlaceHolder.appendChild(draw(State.snakeArray, State.foodCoo));
  }, State.interval);
}
startGame();

function stopGame() {
  clearInterval(gameInterval);
}
