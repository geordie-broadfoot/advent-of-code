import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle(import.meta.url)

const isLower = (char) => char === char.toLowerCase()

const getScore = (char) => {
  const l = isLower(char)
  const val = char.charCodeAt(0)
  return l * (val - 96) + !l * (val - 38)
}

const split = (str) => [str.slice(0, str.length / 2), str.slice(str.length / 2)]

puzzle.setPart1((rawinput) => {
  const input = rawinput.split("\n")

  let totalScore = 0
  for (let i in input) {
    let bag = input[i]

    let [comp1, comp2] = split(bag)

    for (let n in comp1) {
      let ch = comp1[n]
      if (comp2.includes(ch)) {
        totalScore += getScore(ch)
        break
      }
    }
  }
  return totalScore
})

puzzle.setPart2((rawinput) => {
  // Part 2
  const input = rawinput.split("\n")

  let totalScore = 0
  for (let i = 0; i < input.length; i += 3) {
    for (let n in input[i]) {
      let ch = input[i][n]

      if (input[i + 1].includes(ch) && input[i + 2].includes(ch)) {
        totalScore += getScore(ch)
        break
      }
    }
  }
  return totalScore
})

puzzle.run()
