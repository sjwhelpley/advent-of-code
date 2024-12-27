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

function checkOperator(numIndex, numbers, result, operator, currentSum) {
  if (currentSum > result) {
    return false;
  }
  if (numIndex === numbers.length && currentSum < result) return false;
  if (numIndex === numbers.length && currentSum === result) return true;

  if (operator === "*") {
    return (
      checkOperator(
        numIndex + 1,
        numbers,
        result,
        "*",
        currentSum * numbers[numIndex]
      ) ||
      checkOperator(
        numIndex + 1,
        numbers,
        result,
        "+",
        currentSum * numbers[numIndex]
      )
    );
  }
  if (operator === "+") {
    return (
      checkOperator(
        numIndex + 1,
        numbers,
        result,
        "*",
        currentSum + numbers[numIndex]
      ) ||
      checkOperator(
        numIndex + 1,
        numbers,
        result,
        "+",
        currentSum + numbers[numIndex]
      )
    );
  }
}

function checkEquation(eq) {
  const result = eq[0];
  const numbers = eq.slice(1);

  return (
    checkOperator(1, numbers, result, "*", numbers[0]) ||
    checkOperator(1, numbers, result, "+", numbers[0])
  );
}

file.on("close", () => {
  for (const eq of equations) {
    if (checkEquation(eq)) {
      sum += eq[0];
    }
  }

  console.log("TOTAL SUM: ", sum);
});
