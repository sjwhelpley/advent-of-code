const fs = require("fs");
const readline = require("readline");

const file = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  output: process.stdout,
  terminal: false,
});

const map = [];
const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
let positions = new Set();

let positionsCount = 0;

file.on("line", (line) => {
  map.push(line.split(""));
});

function findPosition() {
  for (let i = 0; i < map.length; i++) {
    const row = map[i];
    for (let j = 0; j < row.length; j++) {
      if (row[j] === "V") {
        return {
          currRow: i,
          currColumn: j,
          currDirectionIndex: 2,
        };
      }
      if (row[j] === "<") {
        return {
          currRow: i,
          currColumn: j,
          currDirectionIndex: 3,
        };
      }
      if (row[j] === "^") {
        return {
          currRow: i,
          currColumn: j,
          currDirectionIndex: 0,
        };
      }
      if (row[j] === ">") {
        return {
          currRow: i,
          currColumn: j,
          currDirectionIndex: 1,
        };
      }
    }
  }

  return {
    currRow: null,
    currColumn: null,
    currDirectionIndex: 0,
  };
}

function searchDistinct(initialRow, initialCol, initialDirectionIndex) {
  let row = initialRow;
  let col = initialCol;
  let directionIndex = initialDirectionIndex;

  while (row >= 0 && row < map.length && col >= 0 && col < map[0].length) {
    const direction = directions[directionIndex];

    if (
      row + direction[0] >= 0 &&
      row + direction[0] < map.length &&
      col + direction[1] >= 0 &&
      col + direction[1] < map[0].length &&
      map[row + direction[0]][col + direction[1]] == "#"
    ) {
      directionIndex =
        directionIndex + 1 >= directions.length ? 0 : directionIndex + 1;
    } else {
      positions.add(`${row}x${col}`);
      row += direction[0];
      col += direction[1];
    }
  }
}

function searchLoops(
  initialRow,
  initialCol,
  initialDirectionIndex,
  newObstableRow,
  newObstableCol
) {
  let row = initialRow;
  let col = initialCol;
  let directionIndex = initialDirectionIndex;
  let hitObstacles = new Set();

  while (row >= 0 && row < map.length && col >= 0 && col < map[0].length) {
    const direction = directions[directionIndex];

    if (
      row + direction[0] >= 0 &&
      row + direction[0] < map.length &&
      col + direction[1] >= 0 &&
      col + direction[1] < map[0].length &&
      (map[row + direction[0]][col + direction[1]] == "#" ||
        (row + direction[0] == newObstableRow &&
          col + direction[1] == newObstableCol))
    ) {
      if (
        hitObstacles.has(
          `${row + direction[0]}x${col + direction[1]}x${directionIndex}`
        )
      ) {
        return true;
      }

      hitObstacles.add(
        `${row + direction[0]}x${col + direction[1]}x${directionIndex}`
      );
      directionIndex =
        directionIndex + 1 >= directions.length ? 0 : directionIndex + 1;
    } else {
      row += direction[0];
      col += direction[1];
    }
  }

  return false;
}

file.on("close", () => {
  const { currRow, currColumn, currDirectionIndex } = findPosition();

  searchDistinct(currRow, currColumn, currDirectionIndex);

  console.log("NUM OF DISTINCT POSITIONS: ", positions.size);

  // For all distinct positions, try adding obstacle in each one to look for loop
  for (const value of positions) {
    const newObstableRow = Number(value.split("x")[0]);
    const newObstableCol = Number(value.split("x")[1]);

    if (
      searchLoops(
        currRow,
        currColumn,
        currDirectionIndex,
        newObstableRow,
        newObstableCol
      )
    ) {
      positionsCount++;
    }
  }

  console.log("FOUND POSITIONS: ", positionsCount);
});
