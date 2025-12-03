import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle(import.meta.url)

const parseInput = (input) => {
  return input.split("\n").map((row) => row.split(","))
}

const parse = (str) => [
  parseInt(str.split("-")[0]),
  parseInt(str.split("-")[1]),
]

const toArray = (range) => {
  let arr = []
  for (let i = range[0]; i <= range[1]; i++) {
    arr.push(i)
  }
  return arr
}

puzzle.setPart1((rawinput) => {
  // Part 1
  const input = parseInput(rawinput)
  //console.log(input)
  let count = 0
  input.forEach((pair) => {
    let set1 = parse(pair[0])
    let set2 = parse(pair[1])

    if (
      (set1[0] <= set2[0] && set1[1] >= set2[1]) ||
      (set2[0] <= set1[0] && set2[1] >= set1[1])
    )
      count++
  })
  return count
})

puzzle.setPart2((rawinput) => {
  const input = parseInput(rawinput)
  let count = 0
  input.forEach((pair) => {
    let set1 = toArray(parse(pair[0]))
    let set2 = toArray(parse(pair[1]))
    let overlap = false

    set1.forEach((num) => {
      if (!overlap && set2.includes(num)) {
        overlap = true
        count++
      }
    })
  })

  return count
})

puzzle.run()
