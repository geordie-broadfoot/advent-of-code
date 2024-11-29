import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle("Day 23, 2023")

const deltas = [
  { x: 1, y: 0, dir: ">" },
  { x: -1, y: 0, dir: "<" },
  { x: 0, y: 1, dir: "v" },
  { x: 0, y: -1, dir: "^" },
]

const parseInput = (input) => {
  return input.split("\n").map((row) => {
    return row.split("")
  })
}

const printMap = (map) => {
  console.log(
    map.reduce((msg, col) => {
      return msg + col.join("") + "\n"
    }, "")
  )
}

let record = -1

const addDelta = (pos, d) => ({ x: pos.x + d.x, y: pos.y + d.y })

const walk = (map, pos, end, path = [], pt2) => {
  //console.log("walking... at ", pos)
  let newPath = [...path, pos]

  if (pos.x === end.x && pos.y === end.y) {
    // Found exit
    //console.log("found exit!")
    if (path.length > record) record = path.length
  }

  for (let d of deltas) {
    // Check all neighbours
    let target = addDelta(pos, d)

    // Target is off of map
    if (
      target.x < 0 ||
      target.x >= map[0].length ||
      target.y < 0 ||
      target.y >= map.length
    ) {
      //console.log("Target", target, "is off map")
      continue
    }

    // Target is already visited
    if (path.filter((p) => p.x === target.x && p.y === target.y).length > 0) {
      // console.log("target is already visited", target)
      continue
    }

    const tile = map[target.y][target.x]

    if (["^", ">", "<", "v"])
      if (tile === "#") continue
      else if (tile === "." || pt2 === true) {
        walk(map, target, end, newPath, pt2)
      } else if (tile === d.dir) {
        // console.log("walking down slope")
        walk(map, target, end, newPath)
      }
  }
}

puzzle.setPart1((rawInput) => {
  const input = parseInput(rawInput)

  const start = { y: 0, x: 1 }
  const end = { y: input.length - 1, x: input[0].length - 2 }

  // input[start.y][start.x] = "$"
  // input[end.y][end.x] = "&"

  walk(input, start, end)

  printMap(input)

  return record
})

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput)
  record = -1

  const start = { y: 0, x: 1 }
  const end = { y: input.length - 1, x: input[0].length - 2 }

  walk(input, start, end, [], true)

  return record
})

puzzle.run()
