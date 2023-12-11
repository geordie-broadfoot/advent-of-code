import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle("Day 1, 2023")

const parseInput = (input) => {
  return input.split("\n").map((row) => row.split(""))
}

const findCompleteColumns = (input) => {
  let indexes = []

  for (let x = 0; x < input[0].length; x++) {
    let isComplete = true

    for (let y = 0; y < input.length; y++) {
      if (input[y][x] !== ".") isComplete = false
    }

    if (isComplete) indexes.push(x)
  }
  return indexes.reverse()
}

const findCompleteRows = (input) => {
  let indexes = []

  for (let y = 0; y < input.length; y++) {
    let isComplete = true

    for (let x = 0; x < input[0].length; x++) {
      if (input[y][x] !== ".") isComplete = false
    }

    if (isComplete) indexes.push(y)
  }
  return indexes.reverse()
}

const printMap = (map) => {
  let msg = ""
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      msg += map[y][x]
    }
    msg += "\n"
  }
  console.log(msg)
}

const findAllTiles = (map, tile) => {
  let tiles = []
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === tile) tiles.push({ y, x })
    }
  }
  return tiles
}

const do1MTimes = (callback) => {
  for (let i = 0; i < 1000000; i++) callback()
}

puzzle.setPart1((rawInput) => {
  const input = parseInput(rawInput)

  let cols = findCompleteColumns(input)
  let rows = findCompleteRows(input)
  const blankRow = [...input[rows[0]]]

  printMap(input)

  for (let row of rows) {
    //console.log("adding blank line at index:", row + 1)
    input.splice(row, 0, blankRow)
  }

  for (let row of input) {
    for (let col of cols) {
      row.splice(col, 0, ".")
    }
  }

  let output = 0
  printMap(input)

  const galaxies = findAllTiles(input, "#")

  for (let i = 0; i < galaxies.length; i++) {
    let start = galaxies[i]

    for (let x = i + 1; x < galaxies.length; x++) {
      if (x === i) continue

      let end = galaxies[x]

      let steps = Math.abs(start.x - end.x) + Math.abs(start.y - end.y)

      ///console.log(i, "to", x, ":", steps, "steps")
      output += steps
    }
  }

  return output
})

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput)

  let cols = findCompleteColumns(input)
  let rows = findCompleteRows(input)
  const blankRow = [...input[rows[0]]].map((x) => "M")

  printMap(input)

  for (let row of rows) {
    input[row] = blankRow
  }

  for (let row of input) {
    for (let col of cols) {
      row[col] = "M"
    }
  }

  printMap(input)

  let output = 0

  const skipDistance = 1000000

  const galaxies = findAllTiles(input, "#")

  for (let i = 0; i < galaxies.length; i++) {
    let start = galaxies[i]

    for (let x = i + 1; x < galaxies.length; x++) {
      if (x === i) continue

      let end = galaxies[x]

      let stepsH = end.x - start.x
      let stepsV = end.y - start.y

      let totalSteps = 0

      if (stepsH > 0) {
        for (let x = start.x; x < start.x + stepsH; x++) {
          if (input[start.y][x] === "M") totalSteps += skipDistance
          else totalSteps++
        }
      } else {
        for (let x = start.x; x > start.x + stepsH; x--) {
          if (input[start.y][x] === "M") totalSteps += skipDistance
          else totalSteps++
        }
      }

      if (stepsV > 0) {
        for (let y = start.y; y < start.y + stepsV; y++) {
          if (input[y][start.x] === "M") totalSteps += skipDistance
          else totalSteps++
        }
      } else {
        for (let y = start.y; y > start.y + stepsV; y--) {
          if (input[y][start.x] === "M") totalSteps += skipDistance
          else totalSteps++
        }
      }

      //console.log(i + 1, "to", x + 1, ":", totalSteps, "steps")

      output += totalSteps
    }
  }

  return output
})

puzzle.run()
