const fs = require("fs");
const readline = require("readline");

const file = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  output: process.stdout,
  terminal: false,
});

const equations = [];
let sum = 0;

file.on("line", (line) => {
  equations.push(line.split(" ").map((l) => Number(l.replace(":", ""))));
});

function checkOperator(numbers, result, currentSum, index) {
  if (index === numbers.length - 1 && currentSum === result) return true;

  if (index < numbers.length - 1) {
    const nextIndex = index + 1;
    const nextNum = numbers[nextIndex];
    return (
      checkOperator(numbers, result, currentSum + nextNum, nextIndex) ||
      checkOperator(numbers, result, currentSum * nextNum, nextIndex) ||
      checkOperator(
        numbers,
        result,
        Number(`${currentSum}${nextNum}`),
        nextIndex
      )
    );
  }
  return false;
}

const dfs = (target, nums) => {
  const stack = [{ value: nums[0], index: 0 }];
  while (stack.length) {
    const curr = stack.pop();
    if (curr.index === nums.length - 1 && curr.value === target) {
      return true;
    } else if (curr.index < nums.length - 1) {
      const nextIndex = curr.index + 1;
      const nextNum = nums[nextIndex];
      stack.push({ value: curr.value * nextNum, index: nextIndex });
      stack.push({ value: curr.value + nextNum, index: nextIndex });
      stack.push({
        value: Number(curr.value.toString() + nextNum.toString()),
        index: nextIndex,
      });
    }
  }
  return false;
};

file.on("close", () => {
  for (const eq of equations) {
    const [result, ...numbers] = eq;
    if (checkOperator(numbers, result, numbers[0], 0)) {
      sum += eq[0];
    }
  }

  console.log("TOTAL SUM: ", sum);

  let total = 0;
  equations.forEach((curr) => {
    const [target, ...nums] = curr;
    if (dfs(target, nums)) {
      total += target;
    }
  });

  console.log("TOTAL SUM: ", total);
});
