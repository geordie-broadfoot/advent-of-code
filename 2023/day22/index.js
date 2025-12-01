import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle(import.meta.url)

const parseInput = (input) => {
  return input.split("\n").map((row, i) => {
    let [start, end] = row.split("~")

    const [x1, y1, z1] = start.split(",").map(Number)
    const [x2, y2, z2] = end.split(",").map(Number)

    return {
      id: i + 1,
      moving: true,
      demolished: false,
      pos: {
        x: {
          from: x1,
          to: x2,
        },
        y: {
          from: y1,
          to: y2,
        },
        z: {
          from: z1,
          to: z2,
        },
      },
    }
  })
  //.sort((a, b) => (a.pos.z.from > b.pos.z.from ? 1 : -1))
}

const getTargetFootprint = (brick, dir = -1) => {
  let points = []

  const { x, y, z } = brick.pos

  for (let Y = y.from; Y <= y.to; Y++) {
    for (let X = x.from; X <= x.to; X++) {
      points.push({
        x: X,
        y: Y,
        z: z.from + dir,
      })
    }
  }

  return points
}

const findCollisions = (bricks, brick, dir = -1) => {
  let collidingBricks = []

  if (brick == null) {
    console.error("received null brick")
    return []
  }

  const positions = getTargetFootprint(brick, dir) ?? []
  //console.log(positions)
  for (let b of bricks) {
    if (!b.demolished) {
      for (let pos of positions) {
        if (
          pos.x >= b.pos.x.from &&
          pos.x <= b.pos.x.to &&
          pos.y >= b.pos.y.from &&
          pos.y <= b.pos.y.to &&
          pos.z >= b.pos.z.from &&
          pos.z <= b.pos.z.to
        )
          collidingBricks.push(b)
      }
    }
  }

  return collidingBricks.filter((b) => b.id !== brick.id)
}

const dropBricks = (bricks) => {
  let movingCount = 99999

  while (movingCount > 0) {
    console.log(movingCount, "bricks moving")
    for (let brick of bricks) {
      // on Ground
      if (brick.pos.z.from === 1) {
        brick.moving = false
      } else {
        const collidingBricks = findCollisions(bricks, brick)

        // Is going to collide
        if (collidingBricks.length > 0) {
          for (let b of collidingBricks) {
            // Collided with a stopped brick - this one will also stop now
            if (b.moving === false) {
              brick.moving = false
            }
          }
        } else {
          brick.pos.z.from--
          brick.pos.z.to--
        }
      }
    }

    movingCount = bricks.reduce((sum, b) => sum + b.moving, 0)
  }
}

puzzle.setPart1((rawInput) => {
  const bricks = parseInput(rawInput)

  dropBricks(bricks)

  bricks.forEach((b) => {
    // Map the bricks above and below each other brick
    b.supports = findCollisions(bricks, b)
    b.supporting = findCollisions(bricks, b, 1)
  })

  return bricks.reduce((sum, b) => {
    console.log(
      `Brick ${b.id} is supported by: ${
        b.supports.length === 0
          ? "floor"
          : b.supports.map((x) => x.id).join(", ")
      }, and is supporting ${
        b.supporting.length === 0
          ? "nothing"
          : b.supporting.map((x) => x.id).join(", ")
      }`
    )

    let canBeDeDemolished = false

    if (b.supporting.length === 0) canBeDeDemolished = true
    else {
      // b.demolished = true

      // for (let otherB of b.supporting) {
      //   let collisions = findCollisions(bricks, otherB)

      //   if (collisions.length > 0) canBeDeDemolished = true
      // }

      // b.demolished = false

      if (b.supporting.every((otherB) => otherB.supports.length > 1))
        canBeDeDemolished = true
    }

    console.log(
      `    ->     Brick ${b.id} can ${
        canBeDeDemolished ? "be" : "NOT be"
      } demolished\n`
    )
    return sum + canBeDeDemolished
  }, 0)
})

// Guesses
// 729 -- wrong
// 518 -- incorrect

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput)

  let output = 0

  return output
})

puzzle.run()
