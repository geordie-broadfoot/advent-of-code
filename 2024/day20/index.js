import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle(import.meta.url)

const parseInput = (input) => {
  let start, end
  const map = input.split("\n").map((row, y) =>
    row.split("").map((t, x) => {
      if (t === "S") start = { x, y }
      else if (t === "E") end = { x, y }

      return { x, y, type: t, value: -1 }
    })
  )
  return {
    start,
    end,
    map,
  }
}

const getMapTile = (map, pos) => {
  try {
    return map[pos.y][pos.x]
  } catch {
    return null
  }
}

const getNbs = (map, pos) => [
  getMapTile(map, { x: pos.x - 0, y: pos.y - 1 }), // N
  getMapTile(map, { x: pos.x + 1, y: pos.y }), // E
  getMapTile(map, { x: pos.x - 1, y: pos.y }), // W
  getMapTile(map, { x: pos.x - 0, y: pos.y + 1 }), // S
]

const printMapValues = (map) => {
  let msg = ""

  forEachCell(map, ({ x, y, value }) => {
    if (x === 0) msg += "\n"
    console.log(value)
    let val = value.value.toString()

    if (val == -1) msg += "   "
    else {
      while (val.length < 3) val = " " + val

      msg += val
    }
  })

  console.log(msg)
}

/** Walks the path and assigns a value for step # at that tile */
const walkPath = (map, pos, prev = null, steps = 0) => {
  // Find next tile
  console.log("at pos", pos, "prev", prev)
  const nbs = getNbs(map, pos)
  console.log(` ${nbs[0].type} 
${nbs[1].type}${pos.type}${nbs[2].type}
 ${nbs[3].type}`)
  const next = nbs.filter((t) => {
    if (t.type !== ".") return false
    if (!prev) {
      console.log("default")
      return true
    }
    console.log(t, prev)
    if (prev.x != t.x || prev.y != t.y) {
      console.log("Good")
      return true
    }
    return false
  })[0]
  console.log("next", next)
  if (!next) return steps
  next.value = steps + 1

  if (next.type === "E") {
    return steps + 1
  }

  return walkPath(map, next, pos, steps + 1)
}

puzzle.setPart1((rawInput) => {
  const input = parseInput(rawInput)
  console.log(input)

  walkPath(input.map, { type: "S", ...input.start })

  printMapValues(input.map)

  let output = 0

  return output
})

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput)

  let output = 0

  return output
})

puzzle.run()
