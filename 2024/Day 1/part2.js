const fs = require("fs");
const readline = require("readline");

const file = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  output: process.stdout,
  terminal: false,
});

const leftList = [];
const rightList = [];

file.on("line", (line) => {
  const splitLine = line.split(/\s+/);
  if (splitLine.length == 2) {
    leftList.push(Number(splitLine[0]));
    rightList.push(Number(splitLine[1]));
  }
});

file.on("close", () => {
  const appearances = {};

  for (let i = 0; i < leftList.length; i++) {
    const leftItem = leftList[i];
    const rightItems = rightList.filter((r) => r === leftItem);

    appearances[leftItem] = rightItems.length;
  }

  let score = 0;
  for (const [key, value] of Object.entries(appearances)) {
    score += Number(key) * value;
  }

  console.log("SIMILARILY SCORE: ", score);
});
