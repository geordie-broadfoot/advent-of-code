import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle("Day 1, 2023")

const parseInput = (input) => {
  return input
    .split("\n")
    .map((row) => row.split("   ").map(Number))
    .reduce(
      (acc, row) => {
        return [
          [...acc[0], row[0]],
          [...acc[1], row[1]],
        ]
      },
      [[], []]
    )
    .map((list) => list.sort())
}

puzzle.setPart1((rawInput) => {
  const input = parseInput(rawInput)
  console.log("input", input)
  let difference = 0

  for (let i = 0; i < input[0].length; i++) {
    const n1 = input[0][i]
    const n2 = input[1][i]
    let delta = Math.abs(n1 - n2)

    console.log(`Compared numbers: ${n1} ${n2} - difference of ${delta}`)

    difference += delta
  }

  let output = difference

  return output
})

const scanList = (list) => {
  const numbers = list.toString().split("").map(Number)

  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const output = {}
  for (const d of digits) {
    output[d] = numbers.filter((n) => n === d).length
  }

  return output
}

const getScore = (list, values) => {
  const digits = list.toString().split("").map(Number)

  const score = digits.reduce((acc, c) => (acc += c * values[c]), 0)
  console.log(`Comparing: ${list}, ${values} -> ${score}`)
  console.log(values)
  return score
}

const calculateSimilarities = (lists) => {
  console.log(lists)
  const list1 = scanList(lists[0])
  const list2 = scanList(lists[0])
  let output
  for (let i = 0; i < lists[0].length; i++) {
    const score = getScore(lists[0][i], list2) + getScore(lists[1][i], list1)

    output += score
  }

  return output
}

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput)

  const similarities = calculateSimilarities(input)

  let output = similarities

  return output
})

puzzle.run()
