const fs = require("fs");
const readline = require("readline");

const file = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  output: process.stdout,
  terminal: false,
});

const rules = {};
const updates = [];
let sum = 0;

file.on("line", (line) => {
  if (line.includes("|")) {
    const rule = line.split("|");
    if (rules[rule[0]]) {
      rules[rule[0]].push(rule[1]);
    } else {
      rules[rule[0]] = [rule[1]];
    }
  }

  if (line.includes(",")) {
    updates.push(line.split(","));
  }
});

file.on("close", () => {
  for (let i = 0; i < updates.length; i++) {
    const update = updates[i];
    let isCorrect = true;

    for (let j = 0; j < update.length; j++) {
      const pageNum = update[j];
      const pageNumRules = rules[pageNum] ?? [];

      for (const pageNumRule of pageNumRules) {
        const foundIndex = update.findIndex((u) => u === pageNumRule);
        if (foundIndex >= 0 && foundIndex < j) {
          isCorrect = false;
        }
      }

      if (!isCorrect) break;
    }

    if (isCorrect) {
      sum += Number(update[Math.floor(update.length / 2)]);
    }
  }

  console.log("SUM: ", sum);
});
