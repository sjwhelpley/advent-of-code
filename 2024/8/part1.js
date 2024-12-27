const fs = require("fs");
const readline = require("readline");

const file = readline.createInterface({
  input: fs.createReadStream("input.txt"),
  output: process.stdout,
  terminal: false,
});

const antinodes = [];
const antennas = {};
let gridSize = 0;

file.on("line", (line) => {
  for (let x = 0; x < line.length; x++) {
    if (line[x] === ".") continue;
    antennas[line[x]] = antennas[line[x]] ?? [];
    antennas[line[x]].push({ x, y: gridSize });
  }
  gridSize++;
});

function isOutOfBounds(x, y) {
  return x < 0 || y < 0 || x > gridSize - 1 || y > gridSize - 1;
}

function check(x, y, xx, yy) {
  if (x === xx) return false;
  if (y === yy) return false;
  if (isOutOfBounds(x, y)) return false;
  if (antinodes.some((a) => a.x === x && a.y === y)) return false;
  return true;
}

file.on("close", () => {
  for (const freq of Object.keys(antennas)) {
    for (const a1 of antennas[freq]) {
      for (const a2 of antennas[freq]) {
        const { x: x1, y: y1 } = a1;
        const { x: x2, y: y2 } = a2;

        // Same antenna
        if (x1 === x2 && y1 === y2) continue;

        const [dx, dy] = [x2 - x1, y2 - y1];

        let [x, y] = [x1 - dx, y1 - dy];
        if (check(x, y, x2, y2)) antinodes.push({ x, y });

        [x, y] = [x2 - dx, y2 - dy];
        if (check(x, y, x1, y1)) antinodes.push({ x, y });
      }
    }
  }

  console.log("ANTINODE LOCATIONS: ", antinodes.length);
});
