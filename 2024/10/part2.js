const fs = require("fs");
const readline = require("readline");

const file = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  output: process.stdout,
  terminal: false,
});

const map = [];
let sum = 0;

file.on("line", (line) => {
  map.push(line.split("").map((l) => Number(l)));
});

function checkTrailhead(i, j, currentHeight) {
  if (i < 0 || j < 0 || i >= map.length || j >= map[i].length) {
    return;
  }

  if (map[i][j] === currentHeight) {
    if (currentHeight === 9) {
      sum++;
      return;
    }
    checkTrailhead(i + 1, j, currentHeight + 1);
    checkTrailhead(i, j + 1, currentHeight + 1);
    checkTrailhead(i - 1, j, currentHeight + 1);
    checkTrailhead(i, j - 1, currentHeight + 1);
  } else return;
}

file.on("close", () => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === 0) {
        checkTrailhead(i + 1, j, 1);
        checkTrailhead(i, j + 1, 1);
        checkTrailhead(i - 1, j, 1);
        checkTrailhead(i, j - 1, 1);
      }
    }
  }
  console.log("TOTAL SUM: ", sum);
});
