import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle("Day 6, 2024")

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

puzzle.setPart1((rawInput) => {
  const input = parseInput(rawInput)
  // console.log(input)
  let isOnMap = true

  let currentDir = "n"
  const currentPos = { ...input.startPos }
  while (isOnMap) {
    // Walk
    const nextPos = {
      x: currentPos.x + DIRS[currentDir].x,
      y: currentPos.y + DIRS[currentDir].y,
    }
    const next = getGridCell(input.map, nextPos.x, nextPos.y)

    // console.log("Next tile:", next)

    if (next === "") {
      // outside of map
      // console.log("Went off of map")
      isOnMap = false
    } else if (
      next === "." ||
      next === "^" ||
      next === ">" ||
      next === "v" ||
      next === "<"
    ) {
      // Step forward
      // console.log("Walking to", nextPos)
      currentPos.x = nextPos.x
      currentPos.y = nextPos.y

      // Put direction symbol onto map
      input.map[currentPos.y][currentPos.x] =
        next === "." ? DIRS[currentDir].sym : "@"
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
  // console.log(
  //   input.map
  //     .reduce((a, row) => a + row.join("  ") + "\n", "")
  //     .replace(/\./g, " ")
  // )
  return visitedTiles
})

// Records history of walk
const walkV2 = (grid, opos, hist = []) => {
  const pos = { ...opos }
  let isOnMap = true

  while (isOnMap) {
    let d = DIRS[pos.dir]

    const nextPos = { x: pos.x + d.x, y: pos.y + d.y, dir: pos.dir }

    grid[pos.y][pos.x] = d.sym
    const nextTile = getGridCell(grid, nextPos.x, nextPos.y)

    if (!nextTile) {
      // Not on grid anymore
      isOnMap = false
      return [...hist, pos]
    } else if (
      hist.filter((h) => h.x === pos.x && h.y === pos.y && h.dir === pos.dir)
        .length > 0
    ) {
      // Position exists in history already, going the same direction
      // This must be a loop
      return true
    }
    hist.push({ ...pos })

    if (nextTile === "#" || nextTile === "0") {
      // Turn right
      pos.dir = TURNS[pos.dir]
    } else {
      // Walk
      pos.dir = nextPos.dir
      pos.x = nextPos.x
      pos.y = nextPos.y
    }
  }
}

const copyMap = (map) => {
  return map.map((row) => [...row])
}

puzzle.setPart2((rawInput) => {
  const { map, startPos } = parseInput(rawInput)
  const fMap = copyMap(map)
  const path = walkV2(fMap, { ...startPos, dir: "n" }).reduce((acc, p) => {
    if (acc.filter((a) => a.x === p.x && a.y === p.y).length === 0) acc.push(p)
    return acc
  }, [])
  let output = 0
  // console.log(path.length, path)
  // console.log(fMap.map((row) => row.join("")).join("\n"), "\n\n")

  for (let i = 1; i < path.length; i++) {
    let nMap = copyMap(map)
    // Add a wall at this path pos
    let o = {
      x: path[i].x,
      y: path[i].y,
    }

    nMap[path[i].y][path[i].x] = "0"

    let pp = walkV2(nMap, { ...path[i - 1] }, path.slice(0, i - 1))

    if (pp === true) {
      // console.log(
      //   nMap
      //     .map((row) => row.join(""))
      //     .join("\n")
      //     .replace(/[\.><v^]/g, " "),
      //   "\n\n"
      // )
      output++
    }
  }

  return output
})

puzzle.run()
