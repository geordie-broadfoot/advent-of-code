import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle(import.meta.url)

const testArea = puzzle.isTesting
  ? {
      min: 7,
      max: 27,
    }
  : {
      min: 200000000000000,
      max: 400000000000000,
    }

const parseInput = (input) => {
  return input.split("\n").map((row, i) => {
    const [pos, mv] = row.split(" @ ")

    const [px, py, pz] = pos.split(", ").map(Number)
    const [dx, dy, dz] = mv.split(", ").map(Number)

    return {
      id: i + 1,
      pos: {
        x: px,
        y: py,
        z: pz,
      },
      speed: {
        x: dx,
        y: dy,
        z: dz,
      },
      p1: {
        x: 0,
        y: py - (px / dx) * dy,
        slope: dy / dx,
      },
    }
  })
}

const printLineFormula = (h) => {
  console.log(
    `    ${Math.abs(h.speed.y) === 1 ? "" : h.speed.y}y ${
      h.speed.x > 0 ? "+" : "-"
    } ${Math.abs(h.speed.x) === 1 ? "" : Math.abs(h.speed.x)}x = ${h.p1.y}`
  )
}

const calculateLineIntersection = (h1, h2) => {
  // Solve for y on h1
}

const comparePaths = (hail) => {
  // Iterate over hail stones and compare
  for (let i = 0; i < hail.length - 1; i++) {
    let h = hail[i]

    console.log(`\nHail ${h.id}: `, h.pos, h.p1, h.speed)
    printLineFormula(h)

    for (let ii = i + 1; ii < hail.length; ii++) {
      console.log("   Comparing stone", hail[i].id, "to", hail[ii].id)

      let intersection = calculateLineIntersection(hail[i], hail[ii])
    }
  }
}

puzzle.setPart1((rawInput) => {
  const hail = parseInput(rawInput)

  comparePaths(hail)

  let output = 0

  return output
})

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput)

  let output = 0

  return output
})

puzzle.run()
