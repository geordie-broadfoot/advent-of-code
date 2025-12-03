import { Puzzle } from "../../utils/puzzle.cjs"

const puzzle = new Puzzle("2015, Day 2")

const parseInput = (input) =>
  input.split("\n").map(
    (row) =>
      row
        .split("x")
        .map(Number)
        .sort((a, b) => a - b)
    // .sort()
  )

puzzle.setPart1((input) => {
  return parseInput(input).reduce((acc, sq) => {
    const h = sq[0] * sq[1]
    const w = sq[1] * sq[2]
    const l = sq[2] * sq[0]

    return acc + h * 3 + l * 2 + w * 2
  }, 0)
})

puzzle.setPart2((input) => {
  return parseInput(input).reduce((acc, sq) => {
    const vol = sq[0] * sq[1] * sq[2]
    const loop = (sq[0] + sq[1]) * 2

    return acc + loop + vol
  }, 0)
})

puzzle.run()
