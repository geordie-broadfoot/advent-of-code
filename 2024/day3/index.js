import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle("Day 3, 2024")

const parseInput = (input) => {
  return input
}

puzzle.setPart1((rawInput) => {
  const input = parseInput(rawInput)

  const pattern = /mul\(\d+?,\d+?\)/g

  return input.match(pattern).reduce(
    (acc, line) =>
      acc +
      line
        .slice(4, -1)
        .split(",")
        .map(Number)
        .reduce((acc, n) => acc * n, 1),
    0
  )
})

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput)

  const pattern = /(mul\(\d+?,\d+?\)|do\(\)|don't\(\))/g

  let on = true
  const matches = input.match(pattern)

  return matches.reduce((acc, m) => {
    if (m.match("don't()")) {
      on = false
    } else if (m.match("do()")) {
      on = true
    } else if (on) {
      const nums = m.slice(4, -1).split(",").map(Number)
      acc += nums[0] * nums[1]
    }
    return acc
  }, 0)
})

puzzle.run()
