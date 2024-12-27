const fs = require("fs");
const readline = require("readline");

const file = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  output: process.stdout,
  terminal: false,
});

const reports = [];

file.on("line", (line) => {
  const splitLine = line.split(/\s+/);
  reports.push(splitLine.map((l) => Number(l)));
});

file.on("close", () => {
  let numSafe = 0;
  for (let j = 0; j < reports.length; j++) {
    const report = reports[j];
    const direction = report[1] - report[0] > 0 ? 1 : -1;
    for (let i = 0; i < report.length - 1; i++) {
      const difference = report[i + 1] - report[i];
      const absDifference = Math.abs(difference);
      const isSameDirection =
        (difference < 0 && direction < 0) || (difference > 0 && direction > 0);
      if (isSameDirection && absDifference >= 1 && absDifference <= 3) {
        if (i === report.length - 2) {
          numSafe++;
        }
      } else {
        break;
      }
    }
  }

  console.log("NUMBER SAFE:", numSafe);
});
