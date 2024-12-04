const fs = require("fs");
const readline = require("readline");

const file = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  output: process.stdout,
  terminal: false,
});

const multiplications = [];

file.on("line", (line) => {
  let regex = /mul\([0-9]{1,3},[0-9]{1,3}\)/g;
  const matches = line.match(regex);

  for (const match of matches) {
    const nums = match.replace(/[a-zA-Z()]/g, "").split(",");
    const mult = Number(nums[0]) * Number(nums[1]);
    multiplications.push(mult);
  }
});

file.on("close", () => {
  const sum = multiplications.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  console.log("SUM OF DIFFERENCES: ", sum);
});
