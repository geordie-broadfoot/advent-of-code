import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle(import.meta.url)

const parseInput = (input) => {
  let elves = input.split("\n\n").map((elf) => {
    return elf
      .split("\n")
      .map(Number)
      .reduce((sum, n) => sum + n, 0)
  })
  return elves.sort((a, b) => b - a)
}

puzzle.setPart1((rawinput) => {
  const input = parseInput(rawinput)
  //console.log(input)
  return input[0]
})

puzzle.setPart2((rawinput) => {
  const input = parseInput(rawinput)

  return input[0] + input[1] + input[2]
})

puzzle.run()
