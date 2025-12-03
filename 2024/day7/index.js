import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle(import.meta.url)

const parseInput = (input) => {
  return input.split("\n").map((row) => {
    const [sum, rest] = row.split(": ")

    const numbers = rest.split(" ").map(Number)

    return {
      output: Number(sum),
      numbers,
    }
  })
}

const recursiveCheck = (set, operators, calc = "", depth = 0) => {
  if (depth >= set.numbers.length) {
    // used up all of the numbers
    const out = eval(calc)
    if (out == set.output) {
      console.log("   --- found the combo: ", calc, eval(calc))
      return true
    }
    return false
  }

  if (depth === 0) {
    console.log("Calculating set ", set.numbers.join(" "))
    return recursiveCheck(set, operators, calc + set.numbers[0], 1)
  } else {
    for (let i = 0; i < operators.length; i++) {
      const op = operators[i]

      let newCalc = calc

      if (op === "|") {
        newCalc += "" + set.numbers[depth]
      } else {
        newCalc += " " + op + " " + set.numbers[depth]
      }

      const valid = recursiveCheck(
        set,
        operators,
        "" + eval(newCalc),
        depth + 1
      )

      if (valid) return true
    }
  }

  return false
}

puzzle.setPart1((rawInput) => {
  const input = parseInput(rawInput)

  const valid = input.filter((set) => recursiveCheck(set, ["*", "+"]))

  console.log(valid)

  return valid.reduce((a, r) => a + r.output, 0)
})

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput)

  const valid = input.filter((set) => recursiveCheck(set, ["*", "+", "|"]))

  return valid.reduce((a, r) => a + r.output, 0)
})

puzzle.run()
