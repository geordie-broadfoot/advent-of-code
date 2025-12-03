import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle(import.meta.url)

const ROCK = "O"
const BOULDER = "#"
const SPACE = " "

const DIRECTION = {
  NORTH: { x: 0, y: -1 },
  WEST: { x: -1, y: 0 },
  SOUTH: { x: 0, y: 1 },
  EAST: { x: 1, y: 0 },
}

const parseInput = (input) => {
  const map = input.split("\n").map((r) => r.split(""))

  const rocks = []
  const walls = []

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map.length; x++) {
      let tile = map[y][x]

      if (tile === ROCK) {
        const rock = {
          id: rocks.length + 1,
          type: "rock",
          value: ROCK,
          x,
          y,
          finished: false,
        }
        rocks.push(rock)
        map[y][x] = rock
      } else if (tile === BOULDER) {
        const wall = {
          type: "wall",
          value: BOULDER,
          x,
          y,
        }
        walls.push(wall)
        map[y][x] = wall
      } else
        map[y][x] = {
          type: "space",
          value: SPACE,
        }
    }
  }

  return {
    map,
    rocks,
    walls,
  }
}

const moveRock = (map, rock, dir) => {
  rock.finished = false

  while (!rock.finished) {
    const targetPos = {
      x: rock.x + dir.x,
      y: rock.y + dir.y,
    }

    // Target position is off of map
    if (targetPos.x < 0 || targetPos.y < 0) rock.finished = true
    if (targetPos.x >= map[0].length || targetPos.y >= map.length)
      rock.finished = true

    if (rock.finished) break

    const targetTile = map[targetPos.y][targetPos.x]

    if (targetTile.type === "space") {
      // Swap positions of tiles
      map[rock.y][rock.x] = targetTile
      rock.x = targetPos.x
      rock.y = targetPos.y
      map[rock.y][rock.x] = rock
    } else if (targetTile.type === "wall") {
      // Can't move
      rock.finished = true
    } else {
      if (targetTile.finished === true) rock.finished = true
      else return
    }
  }
}

const getRockScore = (map, rock) => {
  return map.length - rock.y
}

const printMap = (map) => {
  let msg = ""

  for (let y = 0; y < map.length; y++) {
    msg += "\t"
    for (let x = 0; x < map.length; x++) {
      msg += map[y][x].value
    }
    msg += "\t(" + (map.length - y) + ")\n"
  }

  console.log(msg)
}

const findPattern = (scores) => {
  let test = {}
  let pattern = null
  const groupedScores = scores.reduce((obj, score, i) => {
    if (!obj[score]) obj[score] = []
    obj[score].push(i)
    return obj
  }, {})

  Object.entries(groupedScores)
    .filter(([, occurrences]) => occurrences.length > 5)
    .forEach(([score, occurrences]) => {
      if (pattern) return

      let stepSize = occurrences[1] - occurrences[0]

      let isPattern = true

      for (let i = 1; i < occurrences.length - 1; i++) {
        if (occurrences[i] + stepSize !== occurrences[i + 1]) isPattern = false
      }

      if (isPattern) {
        pattern = {
          index: occurrences.slice(-1)[0],
          step: stepSize,
        }
      }
    })

  return pattern
}

puzzle.setPart1((rawInput) => {
  const input = parseInput(rawInput)
  let output = 0

  input.rocks.forEach((rock) => {
    moveRock(input.map, rock, DIRECTION.NORTH)
  })

  input.rocks.forEach((rock) => (output += getRockScore(input.map, rock)))

  return output
})

puzzle.setPart2((rawInput) => {
  let { rocks, map } = parseInput(rawInput)
  let oneB = 1000000000
  let foundPattern = false
  const cycleScores = []
  let cycle = 0
  while (cycle < oneB) {
    // 1 billion cycles of N -> W -> S -> E

    Object.entries(DIRECTION).forEach(([key, delta]) => {
      // Reset rock motion states at start of each tilt
      rocks.forEach((r) => (r.finished = false))

      let movingRocks = rocks.length

      do {
        rocks.forEach((rock) => {
          moveRock(map, rock, delta)
        })

        movingRocks = rocks.filter((r) => r.finished === false).length
      } while (movingRocks > 0)
    })

    // Record the total rock score of this cycle
    cycleScores.push(rocks.reduce((sum, r) => sum + getRockScore(map, r), 0))
    //console.log(cycleScores)
    const pattern = findPattern(cycleScores)
    cycle++
    if (pattern && !foundPattern) {
      foundPattern = true
      console.log("Hey, I found something:", pattern)
      cycle = oneB - ((oneB - pattern.index) % pattern.step) + 1
      console.log("New cycle:", cycle)
    }
  }

  let output = rocks.reduce((sum, r) => sum + getRockScore(map, r), 0)

  return output
})

puzzle.run()
