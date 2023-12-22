import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle("Day 18, 2023")

const deltas = {
  R: { x: 1, y: 0 },
  D: { x: 0, y: 1 },
  L: { x: -1, y: 0 },
  U: { x: 0, y: -1 },
}

const parseInput = (input) => {
  return input.split("\n").map((row) => {
    const [dir, size, color] = row.split(" ")

    return {
      dir: dir,
      size: Number(size),
      color: color.slice(1, -1),
    }
  })
}

const parseInputV2 = (input) => {
  return input.split("\n").map((row) => {
    const code = row.split(" ")[2].slice(2, -1)
    //console.log(code)
    const dirCode = code.slice(-1)
    let dist = parseInt(code.slice(0, -1), 16)

    let dir = Object.keys(deltas)[dirCode]

    return {
      size: dist,
      dir,
      color: "",
    }
  })
}

const addDelta = (pos, d) => ({ x: pos.x + d.x, y: pos.y + d.y })

const executeCommand = (map, p, command) => {
  let delta = deltas[command.dir]
  let pos = p
  for (let i = 0; i < command.size; i++) {
    pos = addDelta(pos, delta)

    if (!map[pos.y]) map[pos.y] = {}

    map[pos.y][pos.x] = {
      hole: true,
      depth: 1,
      color: command.color,
    }
  }

  return pos
}

const toC = (p) => p.x + "," + p.y

const digLake = (map, start) => {
  const queue = [start]
  const visited = {}
  //
  while (queue.length > 0) {
    let current = queue.shift()

    // Mark visited
    visited[toC(current)] = true
    // Dig hole at current pos
    map[current.y][current.x] = true

    // Check the next neighbours
    Object.values(deltas).forEach((d) => {
      let newPos = addDelta(current, d)

      if (!map[newPos.y][newPos.x] && !visited[toC(newPos)]) {
        visited[toC(newPos)] = true
        queue.push(newPos)
      }
    })
  }
}

const printMap = (map, min, max) => {
  let msg = ""
  for (let y = min.y; y <= max.y; y++) {
    for (let x = min.x; x <= max.x; x++) {
      if (y === 0 && x === 0) msg += "X"
      else if (!map[y]?.[x]) msg += " "
      else msg += "."
    }
    msg += "\n"
  }

  console.log(msg)
}

const digTrenches = (input) => {
  let map = {
    0: {
      0: true,
    },
  }

  let max = { x: 0, y: 0 }
  let min = { x: 0, y: 0 }
  let pos = { x: 0, y: 0 }
  for (let i = 0; i < input.length; i++) {
    pos = executeCommand(map, pos, input[i])

    if (pos.x > max.x) max.x = pos.x
    if (pos.y > max.y) max.y = pos.y
    if (pos.x < min.x) min.x = pos.x
    if (pos.y < min.y) min.y = pos.y
  }

  return {
    map,
    min,
    max,
  }
}

const calculateLake = (map) => {
  let lakeSize = 0
  Object.keys(map).forEach((y) => {
    const row = map[y]

    const rowKeys = Object.keys(row)
    //console.log("Row ", y, ":", rowKeys)
    //if (rowKeys.length % 2 !== 0) console.log("somethings fucky:", y, rowKeys)

    lakeSize += rowKeys.length

    let gapSize = 0
    // Iterate over the points in the row,
    let i = 0
    while (i < rowKeys.length - 1) {
      let p1 = rowKeys[i]
      let p2 = rowKeys[i + 1]
      let gap = p2 - p1 - 1
      //console.log(p1, p2, gap)

      gapSize += gap

      i++

      if (gap > 0) i++
    }
    //console.log("Row size: ", rowKeys.length + gapSize)
    lakeSize += gapSize
  })

  return lakeSize
}

const calculateNodes = (commands) => {
  let current = { x: 0, y: 0 }
  return commands.reduce(
    (nodes, cmd) => {
      let delta = deltas[cmd.dir]

      let next = {
        x: current.x + delta.x * cmd.size,
        y: current.y + delta.y * cmd.size,
        dir: cmd.dir,
      }
      nodes.push(next)

      current = next
      return nodes
    },
    [current]
  )
}

const calculateLake2 = (nodes) => {
  let lakeSize = 0

  let dim = nodes.reduce(
    (d, n) => {
      if (n.x > d.max.x) d.max.x = n.x
      if (n.y > d.max.y) d.max.y = n.y
      if (n.x < d.min.x) d.min.x = n.x
      if (n.y < d.min.y) d.min.y = n.y

      return d
    },
    { max: { x: 0, y: 0 }, min: { x: 0, y: 0 } }
  )

  const edges = []

  for (let i = 0; i < nodes.length - 1; i++) {
    let flip = nodes[i + 1].dir === "U" || nodes[i + 1].dir === "L"

    let dir = nodes[i + 1].dir === "U" || nodes[i + 1].dir === "D" ? "V" : "H"

    const from = nodes[i]
    const to = nodes[i + 1]

    edges.push({
      from: flip ? to : from,
      to: flip ? from : to,
      dir,
    })
  }
  //console.log("nodes:", edges[0], edges.slice(-1))
  // Calculate the tiles in each row
  for (let y = dim.min.y; y <= dim.max.y; y++) {
    // Get all edges that cross this horizontal slice of the map
    let edgeList = edges.filter((e) => {
      let valid = e.from.y <= y && e.to.y >= y

      //if (valid) console.log(e)
      return valid
    })

    let e = edgeList
      .reduce((points, edge) => {
        if (edge.dir === "V") {
          points.push(edge.from.x)
        } else {
          for (let x = edge.from.x; x <= edge.to.x; x++) points.push(x)
        }
        return points
      }, [])
      .reduce((unique, p) => {
        if (!unique.includes(p)) unique.push(p)

        return unique
      }, [])
      .sort((a, b) => a - b)

    // Determine how many following rows are going to be identical to this one so they can be skipped
    let skipIndex =
      edgeList.reduce((val, e) => {
        if (e.to.y < val && e.to.y >= y) return e.to.y
        if (e.from.y < val && e.from.y >= y) return e.from.y
        return val
      }, Number.MAX_VALUE) - 1

    let i = 0
    let rowSize = e.length
    while (i < e.length - 1) {
      let p1 = e[i]
      let p2 = e[i + 1]

      let gap = p2 - p1 - 1

      rowSize += gap

      i++

      if (gap > 0) i++
    }

    const blockSize = rowSize * (skipIndex - y + 1)
    // console.log("Row", y)
    // console.log("   points  ", e)
    // console.log("   row size   ", rowSize)
    // console.log("   block size ", blockSize)
    // console.log("   skip index ", skipIndex)

    //for (let n = 0; n < 10000 * 100000; n++) {}
    lakeSize += rowSize
    // y = skipIndex
  }

  return lakeSize
}

puzzle.setPart1((rawInput) => {
  const input = parseInput(rawInput)
  const nodes = calculateNodes(input)
  return calculateLake2(nodes)
})

puzzle.setPart2((rawInput) => {
  const input = parseInputV2(rawInput)

  const nodes = calculateNodes(input)

  return calculateLake2(nodes)
})

puzzle.run()
