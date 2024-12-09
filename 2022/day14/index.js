import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle("Day 14, 2022")

let logging = false
let FLOOR = 0
const EMPTY_SPACE = " "
const WALL = "█"
const SAND = "o"

const log = (...m) => logging && console.log(...m)

const parseInput = (input, pt2) => {
  //console.log(input);
  let lines = input.split("\n")
  let result = {
    walls: [],
    min: { x: 99999, y: 0 },
    max: { x: -99999, y: 0 },
  }
  lines.forEach((l) => {
    let nodes = l.split(" -> ")
    let line = []
    nodes.forEach((n) => {
      let r = n.split(",")
      let x = parseInt(r[0])
      let y = parseInt(r[1])
      line.push({ x, y })
      //console.log('looking at coord', x, y);
      if (x < result.min.x) result.min.x = x
      if (x > result.max.x) result.max.x = x
      if (y < result.min.y) result.min.y = y
      if (y > result.max.y) result.max.y = y
    })
    result.walls.push(line)
  })
  if (pt2) {
    result.max.y += 2

    let h = result.max.y - result.min.y

    result.min.x -= Math.ceil(h)
    result.max.x += Math.ceil(h)
    result.walls.push([
      { x: result.min.x, y: result.max.y },
      { x: result.max.x, y: result.max.y },
    ])
  }
  return result
}

const generateMap = (input) => {
  // generate blank map
  let map = {}
  for (let y = input.min.y; y <= input.max.y; y++) {
    map[y] = {}
    for (let x = input.min.x; x <= input.max.x; x++) {
      map[y][x] = EMPTY_SPACE
    }
  }

  input.walls.forEach((wall) => {
    let prev = wall.shift()
    while (true) {
      if (wall.length == 0) break
      let next = wall.shift()
      //console.log(prev, next);
      let h = next.x - prev.x
      let v = next.y - prev.y
      // horizontal wall
      if (h != 0) {
        if (h > 0) {
          for (let p = prev.x; p <= next.x; p++) map[next.y][p] = WALL
        } else {
          for (let p = prev.x; p >= next.x; p--) map[next.y][p] = WALL
        }
      } else if (v != 0) {
        if (v > 0) {
          for (let p = prev.y; p <= next.y; p++) map[p][prev.x] = WALL
        } else {
          for (let p = prev.y; p >= next.y; p--) map[p][prev.x] = WALL
        }
      }
      prev = next
      //printMap(map);
    }
  })
  map[0][500] = "+"
  return map
}

const printMap = (map) => {
  let msg = ""
  for (let y in map) {
    msg += EMPTY_SPACE
    //console.log(Object.values(map[y]).toString().replaceAll(',', ''));
    for (let x in map[y]) {
      //console.log();
      msg += map[y][x]
    }
    msg += EMPTY_SPACE + "\n"
  }
  console.log(msg)
}

const getTileAt = (map, x, y) => {
  try {
    return map[y][x]
  } catch {
    return null
  }
}

const dropSand = (map) => {
  let start = { x: 500, y: 0 }
  let pos = { ...start }
  let offMap = false
  let a = true
  while (a) {
    let nextTile = getTileAt(map, pos.x, pos.y + 1)
    log("next tile down is: '", nextTile, "'")
    if (nextTile == null) {
      offMap = true
      break
    } else if (nextTile == EMPTY_SPACE) {
      log("moving down 1")
      pos.y++
      continue
    } else {
      // Move left first
      nextTile = getTileAt(map, pos.x - 1, pos.y + 1)
      log("next tile left is: '", nextTile, "'")

      if (nextTile == null) {
        offMap = true
        break
      } else if (nextTile == EMPTY_SPACE) {
        pos.x--
        pos.y++
        continue
      }

      // then try moving right

      nextTile = getTileAt(map, pos.x + 1, pos.y + 1)
      log("next tile right is: '", nextTile, "'")

      if (nextTile == null) {
        offMap = true
        break
      } else if (nextTile == EMPTY_SPACE) {
        pos.x++
        pos.y++
        continue
      }
    }
    break
  }
  if (!offMap) {
    map[pos.y][pos.x] = SAND

    if (pos.x == start.x && pos.y == start.y) return false

    return true
  } else return false
}

puzzle.setPart1((rawInput) => {
  let input = parseInput(rawInput)
  //console.log(input.min, input.max);
  let map = generateMap(input)
  // printMap(map)
  let i = 0
  while (dropSand(map)) {
    i++
    // console.clear()
    // printMap(map)
    // for (let n = 0; n < 50000000; n++);
  }
  // console.clear()
  // printMap(map)
  return i
})

puzzle.setPart2((rawInput) => {
  let part2 = true
  let input = parseInput(rawInput, true)
  //console.log(input.min, input.max);
  let map = generateMap(input)
  // printMap(map)
  let i = part2 ? 1 : 0
  while (dropSand(map)) {
    i++
    // console.clear()
    // printMap(map)
    // for (let n = 0; n < 50000000; n++);
  }
  // console.clear()
  // printMap(map)
  // console.log("iterations:", i)

  return i
})

puzzle.run()
