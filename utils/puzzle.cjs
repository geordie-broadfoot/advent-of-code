const { readFile } = require("./index.cjs")

const nl = '\r\n'

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
    const [yr, dt] = day.split('advent-of-code/')[1].split('/')

    this.day = `Day ${dt.slice(3)}, ${yr}`
    this.input = readFile("input.txt")

    this.tests = readFile("test.txt")
      .split(nl+nl+"--part2"+nl+nl)
      .map((part) => {
        // Take expected value from last row of test
        return part.split(nl+nl+nl).map((testStr) => {
          let rows = testStr.split(nl)
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
        try {
          const output = this.parts[p - 1](input[0], this.isTesting)
          const end = Date.now()

          console.log("    - Output:  ", output)

          this.isTesting && console.log("    - Expected:", input[1][0] ?? "err")
          console.log("\n  (", end - start, "ms )\n\n")
        } catch (err) {
          console.log("Fatal error occurred:\n\n", err)
        }
      })
    })
  }
}

module.exports = {
  Puzzle: Puzzle,
}
