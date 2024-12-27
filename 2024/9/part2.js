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
const files = {};

file.on("line", (line) => {
  diskMap = line;
});

file.on("close", () => {
  for (let i = 0; i < diskMap.length; i++) {
    if (i % 2 === 0) {
      const size = parseInt(diskMap[i]);
      blocks.push(...Array(size).fill(currentId));
      // Map the id to the size
      files[currentId] = size;
      currentId++;
    }
    if (i % 2 === 1) {
      const size = parseInt(diskMap[i]);
      blocks.push(...Array(size).fill("."));
    }
  }

  let endPointer = blocks.length - 1;
  while (endPointer > 0) {
    if (blocks[endPointer] !== ".") {
      const pointerFile = blocks[endPointer];
      const fileSize = files[pointerFile];

      // Find the leftmost gap that can fit this file
      let gapStart = -1;
      let consecutiveDots = 0;

      // Only search up to endPointer, not the entire array
      for (let j = 0; j < endPointer; j++) {
        if (blocks[j] === ".") {
          consecutiveDots++;
          if (consecutiveDots === 1) gapStart = j;

          if (consecutiveDots >= fileSize) {
            // Found a suitable gap - move the file
            blocks.fill(".", endPointer - fileSize + 1, endPointer + 1);
            blocks.fill(pointerFile, gapStart, gapStart + fileSize);
            break;
          }
        } else {
          consecutiveDots = 0;
        }
      }
    }
    endPointer--;
  }

  let sum = 0;
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i] !== ".") {
      sum += i * blocks[i];
    }
  }

  console.log("CHECKSUM: ", sum);
});
