import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle("Day 4, 2024")

// Convert into 2-d array of chars
const parseInput = (input) => {
  return input.split("\n").map((row) => row.split(""))
}

const getGridCell = (grid, x, y) => {
  if (x < 0 || x > grid[0].length || y < 0 || y > grid.length - 1) return ""
  return grid[y][x]
}

const forEachCell = (grid, callback) => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      callback({ x, y, value: grid[y][x] })
    }
  }
}

const dirs = [
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 1, y: 0 },
  { x: 1, y: -1 },
  { x: 0, y: -1 },
]

puzzle.setPart1((rawInput) => {
  const input = parseInput(rawInput)
  let count = 0
  forEachCell(input, ({ value, x, y }) => {
    if (value !== "X") return

    for (let dir of dirs) {
      const letters =
        getGridCell(input, x + dir.x * 1, y + dir.y * 1) +
        getGridCell(input, x + dir.x * 2, y + dir.y * 2) +
        getGridCell(input, x + dir.x * 3, y + dir.y * 3)

      if (letters.match("MAS")) {
        count++
      }
    }
  })

  return count
})

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput)

  let output = 0

  forEachCell(input, ({ x, y, value }) => {
    if (value === "A") {
      const pair1 =
        getGridCell(input, x - 1, y - 1) + getGridCell(input, x + 1, y + 1)

      const pair2 =
        getGridCell(input, x - 1, y + 1) + getGridCell(input, x + 1, y - 1)

      const pattern = /(MS|SM)/

      if (pair1.match(pattern) && pair2.match(pattern)) output++
    }
  })

  return output
})

puzzle.run()
