import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle(import.meta.url)

const deltas = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
]

const parseInput = (input) => {
  const map = input.split("\n").map((row) => {
    return row.split("")
  })

  let start = { x: 0, y: 0 }

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === "S") {
        map[y][x] = "O"
        start = { x, y }
      }
    }
  }
  return {
    map,
    start,
  }
}

const printMap = (map) =>
  console.log(map.reduce((msg, r) => msg + r.join("") + "\n", ""))

const takeStep = (map) => {
  let positions = []
  // Iterate over map
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      // If tile
      if (map[y][x] === "O") {
        positions.push({ x, y })
      }
    }
  }

  for (let p of positions) {
    // Check each neighbour

    map[p.y][p.x] = "."

    for (let d of deltas) {
      const target = {
        x: p.x + d.x,
        y: p.y + d.y,
      }

      // Is off map
      if (
        target.x < 0 ||
        target.y < 0 ||
        target.x >= map[0].length ||
        target.y >= map.length
      )
        continue

      let tile = map[target.y][target.x]

      if (tile === ".") map[target.y][target.x] = "O"
    }
  }
}

puzzle.setPart1((rawInput) => {
  const stepCount = puzzle.isTesting ? 6 : 64

  const { map, start } = parseInput(rawInput)

  for (let i = 0; i < stepCount; i++) {
    takeStep(map)
    printMap(map)
  }

  return map.reduce(
    (ct, row) => ct + row.reduce((ct, t) => ct + (t === "O" ? 1 : 0), 0),
    0
  )
})

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput)

  let output = 0

  return output
})

puzzle.run()
