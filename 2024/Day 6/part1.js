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

file.on("close", () => {
  const { currRow, currColumn, currDirectionIndex } = findPosition();

  let row = currRow;
  let col = currColumn;
  let directionIndex = currDirectionIndex;

  while (row >= 0 && row < map.length && col >= 0 && col < map[0].length) {
    const direction = directions[directionIndex];

    if (map[row + direction[0]][col + direction[1]] == "#") {
      directionIndex =
        directionIndex + 1 >= directions.length ? 0 : directionIndex + 1;
    } else {
      positions.add(`${row}x${col}`);
      row += direction[0];
      col += direction[1];
    }
  }

  console.log("NUM OF DISTINCT POSITIONS: ", positions.size);
});
