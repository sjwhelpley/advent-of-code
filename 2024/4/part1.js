const fs = require("fs");
const readline = require("readline");

const file = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  output: process.stdout,
  terminal: false,
});

const wordSearch = [];
const word = "XMAS";
const directions = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
  [1, 1],
  [-1, 1],
  [1, -1],
  [-1, -1],
];

file.on("line", (line) => {
  wordSearch.push(line.split(""));
});

const search = (row, col, direction, charIndex) => {
  // Found all characters of word in this direction
  if (charIndex === word.length - 1) {
    return true;
  }

  if (
    row + direction[0] < 0 ||
    row + direction[0] >= wordSearch.length ||
    col + direction[1] < 0 ||
    col + direction[1] >= wordSearch[0].length
  ) {
    return false;
  }

  if (
    wordSearch[row + direction[0]][col + direction[1]] === word[charIndex + 1]
  ) {
    return search(
      row + direction[0],
      col + direction[1],
      direction,
      charIndex + 1
    );
  }

  return false;
};

file.on("close", () => {
  const rows = wordSearch.length;
  const cols = wordSearch[0].length;
  let wordCount = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (wordSearch[row][col] === word[0]) {
        for (let i = 0; i < directions.length; i++) {
          const direction = directions[i];
          if (search(row, col, direction, 0)) {
            wordCount++;
          }
        }
      }
    }
  }

  console.log("WORD COUNT: ", wordCount);
});
