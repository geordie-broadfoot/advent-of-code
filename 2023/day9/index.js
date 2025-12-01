import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle(import.meta.url)

const parseInput = (input) => {
  return input.split("\n").map((row) => {
    return row.split(" ").map(Number)
  })
}

const findPattern = (series) => {
  let deltas = []
  for (let i = 0; i < series.length - 1; i++) {
    const delta = series[i + 1] - series[i]
    deltas.push(delta)
  }
  // All zeroes
  if (deltas.filter((d) => d === 0).length === deltas.length) {
    return 0
  }

  // Else find the pattern in the deltas
  let increment = findPattern([...deltas])

  increment = Number(deltas.slice(-1)) + increment

  return increment
}

const findPatternReverse = (series) => {
  let deltas = []
  for (let i = 0; i < series.length - 1; i++) {
    const delta = series[i + 1] - series[i]
    deltas.push(delta)
  }
  //console.log("\n\nSeries:", series)
  //console.log("Deltas:", deltas)
  // All zeroes
  if (deltas.filter((d) => d === 0).length === deltas.length) {
    return 0
  }

  // Else find the pattern in the deltas
  let increment = findPattern([...deltas])

  increment = Number(deltas.slice(-1)) + increment
  // console.log("increment", increment)
  return increment
}

puzzle.setPart1((rawInput) => {
  const input = parseInput(rawInput)
  let output = 0
  //console.log(input)
  output = input.reduce((sum, set) => {
    const value = Number(set.slice(-1)) + findPattern(set)
    //console.log(value)
    return sum + value
  }, 0)
  return output
})

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput)

  return input.reduce((sum, set) => {
    const value = set[0] + findPatternReverse(set.reverse())
    //console.log(set.join(" "), value)
    return sum + value
  }, 0)
})

puzzle.run()
