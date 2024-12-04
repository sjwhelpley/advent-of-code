const fs = require("fs");

const fileContents = fs.readFileSync("./input.txt", "utf8");
const multiplications = [];

let regex = /mul\([0-9]{1,3},[0-9]{1,3}\)|do\(\)|don\'t\(\)/g;
const matches = fileContents.match(regex);

let disabled = false;
for (const match of matches) {
  if (match === "do()") disabled = false;
  if (match === "don't()") disabled = true;
  if (!disabled && match.includes("mul")) {
    const nums = match.replace(/[a-zA-Z()]/g, "").split(",");
    const mult = Number(nums[0]) * Number(nums[1]);
    multiplications.push(mult);
  }
}

const sum = multiplications.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
);

console.log("SUM OF MULTIPLICATIONS: ", sum);
