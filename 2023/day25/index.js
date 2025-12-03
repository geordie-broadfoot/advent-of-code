import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle(import.meta.url)

const parseInput = (input) => {
  return input
    .split("\n")
    .map((row) => {
      const [node, cons] = row.split(": ")

      const nodes = cons.split(" ")

      return [node, ...nodes]
    })
    .reduce((comps, row) => {
      const node = row.shift()

      comps.push([node])

      for (let c of row) {
        comps.push([node, c])
      }

      return comps
    }, [])
    .sort((a, b) => {
      return a.length - b.length
    })
}

puzzle.setPart1((rawInput) => {
  const input = parseInput(rawInput)
  console.log(
    input.reduce((msg, r) => {
      return msg + r.join(" ") + "\\n"
    }, "")
  )
  let output = 0

  return output
})

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput)

  let output = 0

  return output
})

puzzle.run()
