import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle(import.meta.url)

const DIR = {
  E: ">",
  N: "^",
  W: "<",
  S: "V",
}

const reflections = {
  [DIR.E]: {
    "-": [DIR.E],
    "/": [DIR.N],
    "|": [DIR.N, DIR.S],
    "\\": [DIR.S],
  },
  [DIR.N]: {
    "-": [DIR.E, DIR.W],
    "/": [DIR.E],
    "|": [DIR.N],
    "\\": [DIR.W],
  },
  [DIR.S]: {
    "-": [DIR.E, DIR.W],
    "/": [DIR.W],
    "|": [DIR.S],
    "\\": [DIR.E],
  },
  [DIR.W]: {
    "-": [DIR.W],
    "/": [DIR.S],
    "|": [DIR.N, DIR.S],
    "\\": [DIR.N],
  },
}

const toDelta = (dir) => {
  switch (dir) {
    case DIR.N:
      return {
        x: 0,
        y: -1,
      }
    case DIR.E:
      return {
        x: 1,
        y: 0,
      }
    case DIR.S:
      return {
        x: 0,
        y: 1,
      }
    case DIR.W:
      return {
        x: -1,
        y: 0,
      }
    default:
      throw new Error("Invalid value passed into toDelta( ) : " + dir)
  }
}

const parseInput = (input) => {
  return input.split("\n").map((row) => {
    return row.split("").reduce((result, t) => {
      let tile = {
        value: t,
        type: "space",
        energized: false,
        beams: [],
      }

      if (t === ".") return [...result, tile]

      tile.type = "mirror"

      if (t === "-") tile.angle = "0"
      else if (t === "/") tile.angle = "45"
      else if (t === "|") tile.angle = "90"
      else if (t === "\\") tile.angle = "135"

      return [...result, tile]
    }, [])
  })
}

const getTile = (map, pos) => map[pos.y][pos.x]

const shootBeam = (map, pos, dir) => {
  const delta = toDelta(dir)

  // Check if beam has passed over this same path in same direction already
  let isBeamFullyEnergized = true
  let moving = true
  let target = { ...pos }
  let nextTile

  map[pos.y][pos.x].energized = true

  // Pass over spaces and energize them
  while (moving) {
    target = { x: target.x + delta.x, y: target.y + delta.y }
    if (
      target.x < 0 ||
      target.y < 0 ||
      target.y >= map.length ||
      target.x >= map[0].length
    ) {
      // console.log("target is off of map")
      return
    }

    nextTile = getTile(map, target)
    nextTile.energized = true

    if (!nextTile.beams.includes(dir)) {
      isBeamFullyEnergized = false
      nextTile.beams.push(dir)
    }

    if (nextTile.value !== ".") moving = false
  }

  // If beams whole path was already taken, exit
  if (isBeamFullyEnergized === true) {
    return
  }

  // Exit loop when mirror is found
  const dirs = reflections[dir][nextTile.value]

  // Fire resulting beam(s)
  dirs.forEach((d) => {
    shootBeam(map, target, d)
  })
}

const printMap = (map) => {
  let msg = ""
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      let t = map[y][x]

      if (t.type === "mirror") msg += t.value
      else if (t.beams.length > 1) msg += t.beams.length
      else msg += t.beams[0] ?? " "
    }
    msg += "\n"
  }
  console.log(msg)
}

const getEnergizedTiles = (map) =>
  map.reduce(
    (sum, row) =>
      sum + row.reduce((s, tile) => s + (tile.energized ? 1 : 0), 0),
    0
  )

puzzle.setPart1((rawInput) => {
  const input = parseInput(rawInput)
  shootBeam(input, { x: 0, y: 0 }, DIR.E)
  //printMap(input)
  return getEnergizedTiles(input)
})

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput)

  let topRow = input.map((r, i) => ({ pos: { y: 0, x: i }, dir: DIR.S }))
  let bottomRow = input.map((r, i) => ({
    pos: { y: input.length - 1, x: i },
    dir: DIR.N,
  }))
  let leftSide = input.map((r, i) => ({ pos: { y: i, x: 0 }, dir: DIR.E }))
  let rightSide = input.map((r, i) => ({
    pos: { y: i, x: input[0].length - 1 },
    dir: DIR.W,
  }))

  let startPoints = [...topRow, ...bottomRow, ...leftSide, ...rightSide]

  return startPoints.reduce((best, point) => {
    // De-energize map first
    for (let y = 0; y < input.length; y++)
      for (let x = 0; x < input[0].length; x++) {
        input[y][x].energized = false
        input[y][x].beams = []
      }

    shootBeam(input, point.pos, point.dir)

    let score = getEnergizedTiles(input)
    //console.log("Point:", point, " - score: ", score)
    if (score > best) return score
    return best
  }, 0)
})

puzzle.run()
