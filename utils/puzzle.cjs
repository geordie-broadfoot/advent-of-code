const { readFile } = require("./index.cjs")

class Puzzle {
  parts = [
    () => {
      console.log("Not implemented yet!")
    },
    () => {
      console.log("Not implemented yet!")
    },
  ]

  constructor(day) {
    this.day = day
    this.input = readFile("input.txt")

    this.tests = readFile("test.txt")
      .split("\n\n--part2\n\n")
      .map((part) => {
        // Take expected value from last row of test
        return part.split("\n\n\n").map((testStr) => {
          let rows = testStr.split("\n")
          const expectedValue = rows.slice(-1)
          //console.log(rows.slice(0, -1))
          const test = rows.slice(0, -1).join("\n")
          return [test, expectedValue]
        })
      })
    //console.log(this.tests)
  }

  setPart1 = (func) => (this.parts[0] = func)
  setPart2 = (func) => (this.parts[1] = func)

  isTesting = process.argv.includes("-t")

  getInput = (part = 1) => {
    if (this.isTesting) return this.tests[part - 1]
    else return [[this.input]]
  }

  run = () => {
    console.log(
      `\n\nRunning ${this.day}` + (this.isTesting ? " - Test" : "") + "\n"
    )
    const parts = [1, 2]
    parts.forEach((p) => {
      this.getInput(p).forEach((input, i) => {
        console.log("Part", p, "\n")
        this.isTesting && console.log("  Test case #", i + 1, "\n")

        const start = Date.now()
        const output = this.parts[p - 1](input[0])
        const end = Date.now()

        console.log("    - Output:  ", output)

        this.isTesting && console.log("    - Expected:", input[1] ?? "err")
        console.log("\n  (", end - start, "ms )\n\n")
      })
    })
  }
}

module.exports = {
  Puzzle: Puzzle,
}
