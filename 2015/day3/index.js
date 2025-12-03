import { Puzzle } from "../../utils/puzzle.cjs"

const puzzle = new Puzzle("2015, Day 2")

const parseInput = (input) =>
  input.split("\n").map((row) => row.split("x").map(Number))

puzzle.setPart1((input) => {})

puzzle.setPart2((input) => {})

puzzle.run()
