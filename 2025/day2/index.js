import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle(import.meta.url)

const parseInput = (input) => {
  return input
    .replaceAll("\n", "")
    .split(",")
    .map((r) => r.split("-").map(Number))
}

const findPatternIndexes = (pattern, str) => {
  const indexes = []

  let currentIndex = 0
  while (currentIndex < str.length) {
    let index = str.indexOf(pattern, currentIndex)
    if (index === -1) break
    indexes.push(index)
    currentIndex = indexes[indexes.length - 1] + pattern.length
  }

  return indexes
}

puzzle.setPart1((rawInput) => {
  const input = parseInput(rawInput)

  let output = 0

  input.forEach((ids) => {
    // console.log("scanning ranges:", ids)
    for (let i = ids[0]; i <= ids[1]; i++) {
      const str = "" + i
      // console.log("    checking id:", str)
      if (str.length % 2 == 0) {
        const maxLen = Math.round(str.length / 2)

        const firstHalf = str.slice(0, maxLen)
        const secondHalf = str.slice(maxLen)

        if (firstHalf == secondHalf) {
          output += Number(str)
          // console.log(" invalid id:", str)
        }
      }
    }
  })

  return output
})

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput)

  let output = 0

  return output
})

puzzle.run()
