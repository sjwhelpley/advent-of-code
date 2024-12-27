const fs = require("fs");
const readline = require("readline");

const file = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  output: process.stdout,
  terminal: false,
});

let diskMap = "";
let blocks = [];
let currentId = 0;

file.on("line", (line) => {
  diskMap = line;
});

file.on("close", () => {
  for (let i = 0; i < diskMap.length; i++) {
    if (i % 2 === 0) {
      const size = parseInt(diskMap[i]);
      blocks.push(...Array(size).fill(currentId));
      currentId++;
    }
    if (i % 2 === 1) {
      const size = parseInt(diskMap[i]);
      blocks.push(...Array(size).fill("."));
    }
  }

  let endPointer = blocks.length - 1;
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i] === "." && i < endPointer) {
      // Find the last number
      while (blocks[endPointer] === "." && i < endPointer) {
        endPointer--;
      }

      // Swap the dot with the number from the end
      if (endPointer > i) {
        blocks[i] = blocks[endPointer];
        blocks[endPointer] = ".";
        endPointer--;
      }
    }
  }

  let sum = 0;
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i] !== ".") {
      sum += i * blocks[i];
    }
  }

  console.log("CHECKSUM: ", sum);
});
