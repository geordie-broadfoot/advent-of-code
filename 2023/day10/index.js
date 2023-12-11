import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle("Day 10, 2023")

let tileMap = {
  F: "┌",
  7: "┐",
  L: "└",
  J: "┘",
  "|": "│",
  "-": "─",
  ".": " ",
}

const pipeMap = {
  ".": {
    n: false,
    e: false,
    s: false,
    w: false,
  },
  "|": {
    n: true,
    e: false,
    s: true,
    w: false,
  },
  "-": {
    n: false,
    e: true,
    s: false,
    w: true,
  },
  F: {
    n: false,
    e: true,
    s: true,
    w: false,
  },
  J: {
    n: true,
    e: false,
    s: false,
    w: true,
  },
  L: {
    n: true,
    e: true,
    s: false,
    w: false,
  },
  7: {
    n: false,
    e: false,
    s: true,
    w: true,
  },
  S: {
    n: true,
    e: true,
    s: true,
    w: true,
  },
}

const pipeMapV2 = {
  ".": [
    [" ", " ", " "],
    [" ", ".", " "],
    [" ", " ", " "],
  ],
  "|": [
    [" ", "│", " "],
    [" ", "│", " "],
    [" ", "│", " "],
  ],
  "-": [
    [" ", " ", " "],
    ["─", "─", "─"],
    [" ", " ", " "],
  ],
  F: [
    [" ", " ", " "],
    [" ", "┌", "─"],
    [" ", "│", " "],
  ],
  J: [
    [" ", "│", " "],
    ["─", "┘", " "],
    [" ", " ", " "],
  ],
  7: [
    [" ", " ", " "],
    ["─", "┐", " "],
    [" ", "│", " "],
  ],
  L: [
    [" ", "│", " "],
    [" ", "└", "─"],
    [" ", " ", " "],
  ],
  S: [
    [" ", " ", " "],
    [" ", "S", " "],
    [" ", " ", " "],
  ],
}

const parseInput = (input) => {
  let map = input.split("\n").map((row) => {
    return row.split("")
  })

  let start = null

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === "S") start = { x, y }
    }
  }

  return {
    map,
    start,
  }
}
const toOppositeDir = (dir) => {
  switch (dir) {
    case "n":
      return "s"
    case "w":
      return "e"
    case "e":
      return "w"
    case "s":
      return "n"
  }
}

const findNextLoopTile = (map, pos, path) => {
  const currentTile = map[pos.y][pos.x]
  let possibleDirs = Object.entries(pipeMap[currentTile]).reduce(
    (dirs, [direction, allowed]) => {
      if (allowed) dirs.push(direction)
      return dirs
    },
    []
  )
  for (let dir of possibleDirs) {
    const targetPos = {
      x: pos.x + (dir === "e" ? 1 : dir === "w" ? -1 : 0),
      y: pos.y + (dir === "n" ? -1 : dir === "s" ? 1 : 0),
    }

    // Target tile is off map
    if (targetPos.x < 0 || targetPos.y < 0) continue
    if (targetPos.y >= map.length || targetPos.x >= map[0].length) continue

    const targetTile = map[targetPos.y][targetPos.x]
    //console.log(targetTile)

    // If target is the start tile again
    if (
      targetPos.x === path[0].x &&
      targetPos.y === path[0].y &&
      path.length > 2
    ) {
      return targetPos
    }

    // If target is in path already
    if (
      path.filter((p) => p.x === targetPos.x && p.y === targetPos.y).length > 0
    ) {
      continue
    }

    if (targetTile === ".") continue

    if (pipeMap[targetTile][toOppositeDir(dir)]) {
      return targetPos
    } else {
    }
  }
}

const findLoop = ({ map, start }) => {
  let current = start
  let path = [start]
  let finished = false

  while (!finished) {
    let next = findNextLoopTile(map, current, path)
    if (next.x === start.x && next.y === start.y) finished = true
    if (current !== start) path.push(current)
    current = next
  }

  return path
}

puzzle.setPart1((rawInput) => {
  const input = parseInput(rawInput)
  const output = findLoop(input)
  return output.length / 2
})

const parseV2 = (input) => {
  let output = []
  input.forEach((row) => {
    // Map each tile into 3x3, pass once for top, middle, bottom
    for (let h = 0; h < 3; h++) {
      let out = []
      for (let i = 0; i < row.length; i++) {
        let tile = row[i]
        let slice = pipeMapV2[tile][h]
        out.push(...slice)
      }
      output.push(out)
    }
  })

  return output
}

const printMap = (map) => {
  const border = map[0].map((r) => tileMap["-"]).join("")
  let output =
    map.reduce(
      (msg, row) => msg + tileMap["|"] + row.join("") + tileMap["|"] + "\n",
      tileMap["F"] + border + tileMap["7"] + "\n"
    ) +
    tileMap["L"] +
    border +
    tileMap["J"]

  Object.entries(tileMap).forEach(([key, val]) => {
    output = output.replaceAll(key, val)
  })

  console.log(output)
}

const findAllTiles = (input, tile) => {
  const result = []
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (input[y][x] === tile) result.push({ x, y })
    }
  }
  return result
}

const getNeighbours = (map, pos) => {
  const dirs = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
  ]
  let neighbours = []

  for (let dir of dirs) {
    let targetPos = { x: pos.x + dir.x, y: pos.y + dir.y }

    if (
      targetPos.x < 0 ||
      targetPos.y < 0 ||
      targetPos.y >= map.length ||
      targetPos.x >= map[0].length
    )
      continue

    neighbours.push(targetPos)
  }

  const validNeighbours = [" ", ".", "S"]

  return neighbours.filter((n) => validNeighbours.includes(map[n.y][n.x]))
}

const toC = (pos) => pos.x + "," + pos.y

const bfs = (map, start) => {
  const queue = [start]
  const visited = {
    [toC(start)]: true,
  }

  let openTilesFound = 0

  while (queue.length > 0) {
    const tile = queue.shift()

    // Found 0,0 -- outside loop
    //if (tile.x === 0 && tile.y === 0) return false

    if (map[tile.y][tile.x] === ".") {
      map[tile.y][tile.x] = "*"
      openTilesFound++
    }

    let neighbours = getNeighbours(map, tile)
    neighbours.forEach((n) => {
      if (!visited[toC(n)]) {
        visited[toC(n)] = true
        queue.push(n)
      }
    })
  }

  // Couldn't reach 0,0 -- inside loop
  //return true
  return openTilesFound
}

const findPointsInsideLoop = (map, openTiles) => {
  const outsideTiles = bfs(map, {
    x: Math.floor(map[0].length / 2),
    y: Math.floor(map.length / 2),
  })
  return outsideTiles
}

puzzle.setPart2((rawInput) => {
  const { map: map1, start } = parseInput(rawInput)

  const loop = [start, ...findLoop({ map: map1, start })]
  //console.log(loop)
  //printMap(map1)
  for (let y = 0; y < map1.length; y++) {
    for (let x = 0; x < map1[0].length; x++) {
      if (loop.filter((p) => p.x === x && p.y === y).length === 0) {
        map1[y][x] = "."
      }
    }
  }
  //printMap(map1)

  const map = parseV2(map1)

  const origin = findAllTiles(map, "S")[0]

  map[origin.y][origin.x] = " "

  if (pipeMap[map1[start.y + 1]?.[start.x]]?.["n"])
    map[origin.y + 1][origin.x] = "│"

  if (pipeMap[map1[start.y - 1]?.[start.x]]?.["s"])
    map[origin.y - 1][origin.x] = "│"

  if (pipeMap[map1[start.y]?.[start.x + 1]]?.["w"])
    map[origin.y][origin.x + 1] = "─"

  if (pipeMap[map1[start.y]?.[start.x - 1]]?.["e"])
    map[origin.y][origin.x - 1] = "─"

  const openTiles = findAllTiles(map, ".")

  const pointsInside = findPointsInsideLoop(map, openTiles)
  // if (puzzle.isTesting)
  printMap(map)
  return pointsInside
})

puzzle.run()
