import { Puzzle } from "../../utils/puzzle.cjs"

const puzzle = new Puzzle("2015, Day 1")

puzzle.setPart1((input) => {
  console.log("input", input)
  const ups = input.match(/\(/g)
  const downs = input.match(/\)/g)

  console.log(ups)
  console.log(downs)
  const floor = ups.length - downs.length

  return floor
})

puzzle.setPart2((input) => {
  return input.split("").reduce(
    (acc, f, i) => {
      if (f === ")") acc.floor -= 1
      else if (f === "(") acc.floor += 1

      if (acc.floor < 0 && acc.pos === -1) acc.pos = i + 1

      return acc
    },
    { floor: 0, pos: -1 }
  )
})

puzzle.run()
