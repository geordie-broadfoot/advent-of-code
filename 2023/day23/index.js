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

const getMapTile = (map, x, y) => {
  try {
    return map[y][x]
  } catch {
    return null
  }
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

  // walk(input, start, end)

  // printMap(input)

  return record
})

const parseInputV2 = (input) => {
  return input.split("\n").map((row, y) => {
    return row.split("").map((tile, x) => ({
      value: tile === "#" ? "|" : " ",
      x,
      y,
    }))
  })
}

const deltaToDir = (delta) => {
  if (delta.x === -1 && delta.y === 0) return "<"
  if (delta.x === 1 && delta.y === 0) return ">"
  if (delta.x === 0 && delta.y === 1) return "v"
  if (delta.x === 0 && delta.y === -1) return "^"
}
const flipDir = (dir) => {
  switch (dir) {
    case ">":
      return "<"
    case "<":
      return ">"
    case "v":
      return "^"
    case "^":
      return "v"
  }
}

const getNeighbours = (map, pos) =>
  [
    getMapTile(map, pos.x + 1, pos.y + 0),
    getMapTile(map, pos.x - 1, pos.y + 0),
    getMapTile(map, pos.x - 0, pos.y + 1),
    getMapTile(map, pos.x - 0, pos.y - 1),
  ].filter((t) => {
    // Remove nulls and walls
    if (!t || t.value === "|") return false
    return true
  })

/** Walk down a path until a junction is found and return the coordindates */
const walkPath = (map, pos, visited) => {
  const neighbours = getNeighbours(map, pos)
  if (neighbours.length > 2) {
    // Found a junction
    const prev = visited.at(-1)
    const delta = toDelta(pos, prev)
    const dir = deltaToDir(delta)
    map[pos.y][pos.x].value = "%"

    return { coord: toCoord(pos), visited, steps: visited.length, dir }
  }
  // Found the exit tile
  else if (pos.y === map.length - 1 && pos.x === map[0].length - 2) {
    console.log("Found exit tile! ")
    const prev = visited.at(-1)
    const delta = toDelta(pos, prev)
    const dir = deltaToDir(delta)
    map[pos.y][pos.x].value = "X"

    return { coord: toCoord(pos), visited, steps: visited.length, dir }
  }

  for (const n of neighbours) {
    // Remove the previous tile - no walking backward
    const last = visited.at(-1)

    if (n.x === last.x && n.y === last.y) {
      continue
    }

    return walkPath(map, { ...n }, [...visited, { x: pos.x, y: pos.y }])
  }
  return null
}

const printChart = (chart) => {
  console.log(
    Object.entries(chart).reduce((msg, [coord, node]) => {
      msg += " - " + coord + ":\n"

      Object.entries(node.connections).reduce((m, [crd, n]) => {
        msg += `  - ${crd}  (${n.steps} steps) (dir ${n.dir})\n`
      }, "")

      return msg
    }, "")
  )
}

const toPos = (str) => ({
  x: Number(str.split(",")[0]),
  y: Number(str.split(",")[1]),
})
const toCoord = (tile) => "" + tile.x + "," + tile.y
const toDelta = (p1, p2) => ({ x: p1.x - p2.x, y: p1.y - p2.y })
/** Start from a position and find the next junction. Check all available paths
 *
 * Map into a node-edge graph
 *
 */
const findPaths = (map, chart) => {
  let scanning = true
  // console.log("Scanning for paths....")
  while (scanning) {
    // console.log("   --- scanning round begin ----")
    let scannedANode = false
    for (const kv of Object.entries(chart).filter(([k, v]) => !v.scanned)) {
      const [coord, nodex] = kv
      const node = chart[coord]
      // Don't rescan a completed node
      if (node.scanned) {
        // console.log("already scanned ", coord)
        continue
      }
      // console.log("    scanning node ", coord)
      chart[coord].scanned = true
      scannedANode = true

      const pos = toPos(coord)
      // Find available tiles to walk on from this point
      const neighbours = getNeighbours(map, pos)

      // Walk each path and get the result
      const paths = neighbours.reduce((p, nb) => {
        // TO-DO : check if this path is already ammped

        const path = walkPath(map, nb, [pos], 1)

        if (!path) return p

        return [...p, path]
      }, [])

      // Add the mapped connections to this node in the chart
      chart[toCoord(pos)] = {
        scanned: true,
        connections: paths.reduce((conn, p) => {
          // Get delta of start and second tiles
          const dt = toDelta(p.visited.at(1), p.visited.at(0))

          conn[p.coord] = {
            steps: p.steps,
            dir: deltaToDir(dt),
          }
          return conn
        }, {}),
      }

      // Add the end nodes of the paths to the chart as unscanned
      for (let p of paths) {
        // Get delta of last 2 tiles
        const dt = toDelta(p.visited.at(-2), p.visited.at(-1))

        if (!chart[p.coord]) {
          chart[p.coord] = {
            scanned: false,
            connections: {
              [toCoord(pos)]: {
                steps: p.steps,
                dir: deltaToDir(dt),
              },
            },
          }
        }
      }
    }
    // No nodes were left to scan - we're done
    if (!scannedANode) scanning = false
  }

  // printChart(chart)
  // continue to next iteration
  // findPaths(map, chart)
}

const printMap2 = (map) =>
  console.log(map.map((row) => row.map((t) => t.value).join("")).join("\n"))

const walkGraph = (chart, end, pos = "1,0", hist = []) => {
  // if (hist.length >= 5) return

  const node = chart[pos]

  // Sort paths longest to shortest
  const paths = Object.entries(node.connections).sort(
    (a, b) => b[1].steps - a[1].steps
  )

  if (pos === end) {
    const distance = hist.reduce((a, t) => a + t[1].steps, 0)

    // console.log(distance, record)

    if (distance > record) record = distance

    return
  }

  for (const p of paths) {
    // Don't go backwards, don't revisit a tile
    if (hist.filter((h) => h[0] === p[0]).length > 0) {
      continue
    }

    // Take path
    walkGraph(chart, end, p[0], [...hist, p])
  }
}

puzzle.setPart2((rawInput) => {
  const input = parseInputV2(rawInput)
  record = -1

  const start = { y: 0, x: 1 }
  const end = { y: input.length - 1, x: input[0].length - 2 }
  console.log(start, end)
  const chart = {
    "1,0": {
      scanned: false,
    },
  }

  findPaths(input, chart)

  printMap2(input)

  // Traverse the graph and find longest path
  walkGraph(chart, toCoord(end))

  return record
})

puzzle.run()
