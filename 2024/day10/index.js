import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle(import.meta.url)

const parseInput = (input) => {
  return input.split("\n").map((row) => {
    return row.split("").map(Number)
  })
}

const getMapTile = (map, pos) => {
  try {
    return map[pos.y][pos.x]
  } catch {
    return null
  }
}

const dirs = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
]

const getNeighbours = (map, pos) => {
  return dirs
    .map((dir) => {
      let np = { x: pos.x + dir[0], y: pos.y + dir[1] }
      return { np, value: getMapTile(map, np) }
    })
    .filter((t) => t.value)
}

const getTrailValue = (map, pos) => {
  const tile = getMapTile(map, pos)

  const neighbours = getNeighbours(map, pos)
  if (tile === 9) {
    return pos
  }
  let value = []

  for (const n of neighbours) {
    if (n.value - tile === 1) {
      // is 1 greater, valid path, search next position
      const tV = getTrailValue(map, n.np)

      if (tV) {
        if (Array.isArray(tV)) value.push(...tV)
        else value.push(tV)
      }
    }
  }

  return value
}

puzzle.setPart1((rawInput) => {
  const input = parseInput(rawInput)
  let output = 0

  forEachCell(input, ({ value, x, y }) => {
    if (value === 0) {
      let pVal = getTrailValue(input, { x, y })

      const uniques = pVal.reduce(
        (a, t) =>
          a.filter((x) => x.x === t.x && x.y === t.y).length ? a : [...a, t],
        []
      )

      output += uniques.length
    }
  })

  return output
})

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput)

  let output = 0
  forEachCell(input, ({ value, x, y }) => {
    if (value === 0) {
      let pVal = getTrailValue(input, { x, y })

      output += pVal.length
    }
  })

  return output
})

puzzle.run()
