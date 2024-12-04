import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle("Day 1, 2023")

const parseInput = (input) => {
  return input
}

puzzle.setPart1((rawInput) => {
  const input = parseInput(rawInput)

  const pattern = /mul\(\d+?,\d+?\)/g

  return input.match(pattern).reduce((acc, line) => {
    const nums = line.split("").slice(4, -1).join("").split(",").map(Number)
    return acc + nums[0] * nums[1]
  }, 0)
})

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput)

  const pattern = /(mul\(\d+?,\d+?\)|do\(\)|don't\(\))/g

  let output = 0
  let on = true
  const matches = input.match(pattern)
  console.log(matches)
  for (let i = 0; i < matches.length; i++) {
    const m = matches[i]
    if (m.match("don't()")) {
      console.log("disabling")
      on = false
    } else if (m.match("do()")) {
      on = true
      console.log("enabling")
    } else if (on) {
      const nums = m.split("").slice(4, -1).join("").split(",").map(Number)
      console.log("Multiplying", nums)
      output += nums[0] * nums[1]
    }
  }

  return output
})

puzzle.run()
