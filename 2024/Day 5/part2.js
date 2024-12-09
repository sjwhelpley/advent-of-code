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

function moveElement(array, fromIndex, toIndex) {
  const element = array.splice(fromIndex, 1)[0]; // Remove the element
  array.splice(toIndex, 0, element); // Insert at the new index
  return array;
}

function checkUpdate(update) {
  for (let j = 0; j < update.length; j++) {
    const pageNum = update[j];
    const pageNumRules = rules[pageNum] ?? [];

    for (const pageNumRule of pageNumRules) {
      const foundIndex = update.findIndex((u) => u === pageNumRule);
      if (foundIndex >= 0 && foundIndex < j) {
        return false;
      }
    }
  }
  return true;
}

function findCorrectUpdate(update) {
  if (checkUpdate(update)) return update;

  for (let j = 0; j < update.length; j++) {
    const pageNum = update[j];
    const pageNumRules = rules[pageNum] ?? [];

    for (const pageNumRule of pageNumRules) {
      const foundIndex = update.findIndex((u) => u === pageNumRule);
      if (foundIndex >= 0 && foundIndex < j) {
        update = moveElement(update, foundIndex, j + 1);
      }
    }
  }

  return findCorrectUpdate(update);
}

file.on("close", () => {
  for (let i = 0; i < updates.length; i++) {
    let update = updates[i];

    if (!checkUpdate(update)) {
      const correctUpdate = findCorrectUpdate(update);
      sum += Number(correctUpdate[Math.floor(update.length / 2)]);
    }
  }

  console.log("SUM: ", sum);
});
