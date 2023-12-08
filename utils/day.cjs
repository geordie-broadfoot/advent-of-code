const { readFile } = require("./index.cjs")

class Puzzle {
  constructor(day, part1, part2) {
    this.day = day
    this.rawInput = readFile("input.txt")

    const tests = readFile("test.txt").split("\n\n\n")

    this.testInput1 = tests[0]
    this.testInput2 = tests[1]
  }

  isTesting = process.argv.includes("-t")
  part2 = process.argv.includes("-p2")

  getInput = (part) => {
    if (this.isTesting && part == 1) return this.testInput1
    else if (this.isTesting && part == 2) return this.testInput2
    else return this.rawInput
  }
}

module.exports = {
  Puzzle: Puzzle,
}
