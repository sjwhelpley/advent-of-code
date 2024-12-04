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
  const sortedLeftList = leftList.sort((a, b) => a - b);
  const sortedRightList = rightList.sort((a, b) => a - b);

  const distances = [];

  for (let i = 0; i < sortedLeftList.length; i++) {
    const leftItem = sortedLeftList[i];
    const rightItem = sortedRightList[i];

    if (rightItem > leftItem) {
      distances.push(rightItem - leftItem);
    } else {
      distances.push(leftItem - rightItem);
    }
  }
  const sum = distances.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  console.log("SUM OF DIFFERENCES: ", sum);
});
