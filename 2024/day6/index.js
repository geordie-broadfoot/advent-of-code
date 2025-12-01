import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle(import.meta.url)

const WALL = /#/g
const OPEN = /[\.\^>V<]/g

const DIRS = {
  n: {
    x: 0,
    y: -1,
    sym: "^",
  },
  e: {
    x: 1,
    y: 0,
    sym: ">",
  },
  s: {
    x: 0,
    y: 1,
    sym: "v",
  },
  w: {
    x: -1,
    y: 0,
    sym: "<",
  },
}

const TURNS = {
  n: "e",
  e: "s",
  s: "w",
  w: "n",
}

const parseInput = (input) => {
  const map = input.split("\n").map((row) => {
    return row.split("")
  })

  const startPos = { x: -1, y: -1 }

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (getGridCell(map, x, y) === "^") {
        startPos.x = x
        startPos.y = y
      }
    }
  }
  return {
    map,
    startPos,
  }
}

const getGridCell = (grid, x, y) => {
  if (x < 0 || x > grid[0].length || y < 0 || y > grid.length - 1) return ""
  return grid[y][x]
}

puzzle.setPart1((rawInput, testing) => {
  const input = parseInput(rawInput)
  let isOnMap = true

  let currentDir = "n"
  const currentPos = { ...input.startPos }
  let steps = 0
  while (isOnMap) {
    // Walk
    steps++
    const nextPos = {
      x: currentPos.x + DIRS[currentDir].x,
      y: currentPos.y + DIRS[currentDir].y,
    }
    const next = getGridCell(input.map, nextPos.x, nextPos.y)


    if (next === "") {
      // outside of map
      isOnMap = false
    } else if (
      ['.', '^','>','<','v'].includes(next)
    ) {
      // Step forward
      currentPos.x = nextPos.x
      currentPos.y = nextPos.y

      // Put direction symbol onto map
     
      input.map[currentPos.y][currentPos.x] = next === '.' ? DIRS[currentDir].sym : 'X'
    } else if (next === "#") {
      // Hit wall, turn right
      currentDir = TURNS[currentDir]
      input.map[currentPos.y][currentPos.x] = DIRS[currentDir].sym
    }
  }

  const visitedTiles = input.map.reduce(
    (sum, r) =>
      sum +
      r.reduce((s, t) => {
        if (t === "." || t === "#") return s
        return s + 1
      }, 0),
    0
  )
testing && console.log(input.map.map(r => r.join('')).join('\n').replace(/\./g, ' '))
  return visitedTiles
})

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput)

  let output = 0

  return output
})

puzzle.run()