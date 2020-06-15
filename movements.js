const defineDirection = (direction, x, y, actualDir) => {
  if (direction !== actualDir) {
    if (direction == 38 && actualDir !== 40) {
      // up arrow
      y -= 20;
      x = 0;
      actualDir = 38;
    } else if (direction == 40 && actualDir !== 38) {
      // down arrow
      y += 20;
      x = 0;
      actualDir = 40;
    } else if (direction == 37 && actualDir !== 39) {
      // left arrow
      x -= 20;
      y = 0;
      actualDir = 37;
    } else if (direction == 39 && actualDir !== 37) {
      // right arrow
      x += 20;
      y = 0;
      actualDir = 39;
    } else {

    }
  }
  return { x: x, y: y, newDirCode: actualDir };
};

const verifyCoordinates = (x, y) => {
  if (x < 0) {
    x = 600;
  }
  if (x > 600) {
    x = 0;
  }
  if (y < 0) {
    y = 600;
  }
  if (y > 600) {
    y = 0;
  }
  return { x: x, y: y };
};



export {defineDirection, verifyCoordinates };
