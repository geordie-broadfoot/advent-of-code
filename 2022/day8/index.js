import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle(import.meta.url)

const parseData = (input) => {
  let map = []
  input.split("\n").forEach((i) => map.push(Array.from(i)))

  let result = {
    trees: [],
    rows: [],
    cols: [],
  }

  for (let y = 0; y < map.length; y++) {
    result.rows.push([])
    result.cols.push([])
    for (let x = 0; x < map.length; x++) {
      let tree = {
        height: parseInt(map[y][x]),
        pos: { x, y },
        los: {
          n: 0,
          e: 0,
          s: 0,
          w: 0,
        },
        visible: {
          n: true,
          e: true,
          s: true,
          w: true,
        },
      }
      result.trees.push(tree)
      result.rows[y].push(map[x][y])
      result.cols[y].push(map[y][x])
    }
  }

  return result
}

const findLOS = (tree, row, col) => {
  let logging = false
  if (tree.height == -1) logging = true

  let dirs = {
    n: col.slice(0, tree.pos.y).reverse(),
    s: col.slice(tree.pos.y + 1),
    e: row.slice(tree.pos.x + 1),
    w: row.slice(0, tree.pos.x).reverse(),
  }

  if (logging) {
    console.log("\n\nFinding LOS of tree at pos ", tree.pos, "\n")
    console.log("row:", row)
    console.log("col:", col)
    console.log(dirs)
  }

  for (let key in dirs) {
    let line = dirs[key]

    if (logging) console.log(key, line)

    let i = 0
    while (true) {
      if (line.length == 0) {
        if (tree.los[key] == 0) tree.los[key] = i
        break
      }

      i++
      let h = parseInt(line.shift())

      if (logging && tree.visible[key])
        console.log("looking", key, " ht=" + tree.height, "to", h, "  step", i)

      if (h >= tree.height && tree.visible[key]) {
        logging && console.log("blocking tree: ", h, "at step", i)
        tree.los[key] = i
        tree.visible[key] = false
      }
    }
  }
}

const isTreeVisible = (tree) => {
  return tree.visible.n || tree.visible.e || tree.visible.s || tree.visible.w
}

const determineVisibility = (map) => {
  map.trees.forEach((tree) => {
    let { x, y } = tree.pos
    let row = map.rows[x]
    let col = map.cols[y]
    findLOS(tree, col, row)
    tree.visible = isTreeVisible(tree)
  })

  return map
}

const process = (input) => {
  let map = parseData(input)
  map = determineVisibility(map)
  return map
}

const getBestScore = (map) => {
  return map.trees.reduce((acc, t) => {
    let { n, e, s, w } = t.los
    let score = n * e * s * w
    if (score > acc) return score
    return acc
  }, 0)
}

puzzle.setPart1((rawinput) => {
  let map = process(rawinput)

  return map.trees.filter((t) => t.visible).length
})

puzzle.setPart2((rawinput) => {
  let map = process(rawinput)
  return getBestScore(map)
})

puzzle.run()
