import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle(import.meta.url)

const parseInput = (input) => {
  return input.split("\n").map((row) => {
    return row.split("").map(Number)
  })
}

const DIR = {
  N: "^",
  E: ">",
  S: "V",
  W: "<",
}

const deltas = {
  [DIR.N]: { x: 0, y: -1 },
  [DIR.E]: { x: 1, y: 0 },
  [DIR.S]: { x: 0, y: 1 },
  [DIR.W]: { x: -1, y: 0 },
}

const toOppositeDir = (dir) => {
  switch (dir) {
    case DIR.N:
      return DIR.S
    case DIR.E:
      return DIR.W
    case DIR.S:
      return DIR.N
    case DIR.W:
      return DIR.E
  }
}

const addPos = (pos1, delta) => ({ x: pos1.x + delta.x, y: pos1.y + delta.y })

const getPathScore = (map, path = []) => {
  console.log("getting score:", path)
  return path.reduce((sum, pos) => sum + map[pos.y][pos.x], 0)
}
const getNeighbours = (map, pos, path, limit = 3) => {
  // Find valid neighbours, including limit of 3 same moves in a row
  console.log("finding neighbours of tile: ", pos)
  return Object.entries(deltas).reduce((neighbours, [dir, delta]) => {
    const target = { ...addPos(pos, delta), move: dir }
    console.log(dir, " - ", target)
    // Target is off map
    if (
      target.x < 0 ||
      target.y < 0 ||
      target.x >= map[0].length ||
      target.y >= map.length
    ) {
      console.log("    tile is off map - invalid")
      return neighbours
    }
    // Is trying to do a 180
    if (dir === toOppositeDir(path.slice(-1).move)) {
      console.log("    tile would be going backwards - invalid")
      return neighbours
    }

    // Has already taken 3 steps in this dir
    if (path.length < 3) {
      console.log("    less than 3 steps taken so far - anything goes")
      return [...neighbours, target]
    }

    const last3Steps = path.slice(-3)

    if (last3Steps.every((s) => s.move === dir)) {
      console.log("    made this move 3 times already - invalid")
      return neighbours
    }

    console.log("    tile is valid")
    return [...neighbours, target]
  }, [])
}

let bestPath = -1

const findPath = (map, goal, pos, path = []) => {
  let minDist = map.length + map[0].length
  //console.log("finding path:", path)
  // Found the goal!
  if (pos.x === goal.x && pos.y === goal.y) {
    console.log("found goal")
    let pathScore = getPathScore(map, path)

    if (pathScore < bestPath) bestPath = pathScore
  }

  // Start checking the path score against the best - exit if path is worse
  if (path.length > minDist) {
    let pathScore = getPathScore(map, path)

    if (pathScore >= bestPath) return
  }

  // Find all valid neighbours and sort by heat value
  const neighbours = getNeighbours(map, pos, path).sort((a, b) => {
    return map[a.y][a.x] - map[b.y][b.x]
  })

  // Iteratively check the next options
  for (let n of neighbours) {
    let newPath = [...path, n]

    findPath(map, goal, n, newPath)
    // for (let i = 0; i < 10000 * 10000 * 10; i++) {}
  }
}

puzzle.setPart1((rawInput) => {
  const input = parseInput(rawInput)

  let path = findPath(
    input,
    { x: input[0].length - 1, y: input.length - 1 },
    { x: 0, y: 0 }
  )

  let output = 0

  return bestPath
})

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput)

  let output = 0

  return output
})

puzzle.run()
