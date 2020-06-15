function drawCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 600;
  canvas.style.border = "1px solid black";
  canvas.style.marginTop = "2rem";
  return canvas;
}

function drawSnake (snakeArr, ctx) {
  let context = ctx;
  const width = 20;
  const height = 20;
  snakeArr.forEach((snakePiece) => {
    context.lineWidth = 1;
    context.fillStyle = "#FF0000";
    context.fillRect(snakePiece.x, snakePiece.y, width, height);
    context.strokeStyle = "#000000";
    context.strokeRect(snakePiece.x, snakePiece.y, width, height);
    context.stroke();
  });
};

function drawFood(coordinates, context) {
  let x = coordinates.x + 10;
  let  y = coordinates.y + 10;
  const radius = 10;
  context.arc(x, y, radius, 0, 2* Math.PI, false);
  context.lineWidth = 1;
  context.strokeStyle = "green";
  context.fillStyle = "green";
  context.fill();
  context.stroke();
};

const draw = (snake, food) => {
  const canvas = drawCanvas();
  const context = canvas.getContext("2d");
  drawSnake( snake, context );
  drawFood(food, context);
  return canvas;
};

export {draw };