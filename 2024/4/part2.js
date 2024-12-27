const fs = require("fs");
const readline = require("readline");

const file = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  output: process.stdout,
  terminal: false,
});

const wordSearch = [];

file.on("line", (line) => {
  wordSearch.push(line.split(""));
});

const search = (row, col, direction, char) => {
  if (
    row + direction[0] < 0 ||
    row + direction[0] >= wordSearch.length ||
    col + direction[1] < 0 ||
    col + direction[1] >= wordSearch[0].length
  ) {
    return false;
  }

  if (wordSearch[row + direction[0]][col + direction[1]] === char) {
    return true;
  }

  return false;
};

file.on("close", () => {
  const rows = wordSearch.length;
  const cols = wordSearch[0].length;
  let wordCount = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (wordSearch[row][col] === "A") {
        const leftDiagonal =
          (search(row, col, [-1, -1], "M") && search(row, col, [1, 1], "S")) ||
          (search(row, col, [-1, -1], "S") && search(row, col, [1, 1], "M"));
        const rightDiagonal =
          (search(row, col, [-1, 1], "M") && search(row, col, [1, -1], "S")) ||
          (search(row, col, [-1, 1], "S") && search(row, col, [1, -1], "M"));
        if (leftDiagonal && rightDiagonal) {
          wordCount++;
        }
      }
    }
  }

  console.log("COUNT: ", wordCount);
});
