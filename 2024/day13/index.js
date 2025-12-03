import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle(import.meta.url)

const parseInput = (input, pt2) => {
  return input.split("\n\n").map((set) => {
    const [a, b, p] = set.split("\n")

    const [aX, aY] = a.split(",").map((i) => Number(i.split("+")[1]))
    const [bX, bY] = b.split(",").map((i) => Number(i.split("+")[1]))
    const [pX, pY] = p.split(",").map((i) => Number(i.split("=")[1]))

    return {
      a: { x: aX, y: aY },
      b: { x: bX, y: bY },
      p: {
        x: pX + (pt2 ? 10000000000000 : 0),
        y: pY + (pt2 ? 10000000000000 : 0),
      },
    }
  })
}

puzzle.setPart1((rawInput) => {
  const input = parseInput(rawInput)
  // console.log(input)

  const scores = creamers(input)

  return scores.reduce((sum, s) => sum + (s.a * 3 + s.b), 0)

  const solutions = input.reduce((solutions, set, i) => {
    // Press A and then check if the remainder is divisible by B
    // Go until A is beyond P in some dimension to make sure all possible solutions are found
    let current = { x: 0, y: 0 }
    let presses = 0
    // Object.values was ignoring a property with a key of 0
    let key = "a" + i

    solutions[key] = []

    while (current.x <= set.p.x && current.y <= set.p.y) {
      if (current.x === set.p.x && current.y === set.p.y) {
        solutions[key].push({
          a: presses,
          b: 0,
        })
      }
      let remainder = {
        x: set.p.x - current.x,
        y: set.p.y - current.y,
      }
      // Can reach point by mashing b the rest of the way
      if (remainder.x % set.b.x === 0 && remainder.y % set.b.y === 0) {
        if (remainder.x / set.b.x === remainder.y / set.b.y)
          solutions[key].push({
            a: presses,
            b: remainder.x / set.b.x,
          })
      }

      current.x += set.a.x
      current.y += set.a.y
      presses++
    }
    return solutions
  }, {})

  // console.log("sols", solutions)

  let output = Object.values(solutions).reduce((sum, sol, i) => {
    const best = sol.reduce(
      (best, s) => {
        if (s.a > 100 || s.b > 100) return best

        const score = s.a * 3 + s.b

        if (score < best.score || best.score === 0)
          return {
            score,
            ...s,
          }
        return best
      },
      {
        score: 0,
      }
    )

    //console.log("sol", sol)
    console.log(i + 1, "best score:", best)
    return sum + best.score
  }, 0)

  return output
})

// Cramer's solution - apparently? ... from a r/adventofcode thread
// A = (p_x*b_y - p_y*b_x) / (a_x*b_y - a_y*b_x)
// B = (a_x*p_y - a_y*p_x) / (a_x*b_y - a_y*b_x)

const creamers = (sets) => {
  const oslutions = []
  for (const s of sets) {
    oslutions.push({
      a: (s.p.x * s.b.y - s.p.y * s.b.x) / (s.a.x * s.b.y - s.a.y * s.b.x),
      b: (s.a.x * s.p.y - s.a.y * s.p.x) / (s.a.x * s.b.y - s.a.y * s.b.x),
    })
  }
  return oslutions.filter(
    (s) => s.a === Math.floor(s.a) && s.b === Math.floor(s.b)
  )
}

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput, true)

  const scores = creamers(input)

  return scores.reduce((sum, s) => sum + (s.a * 3 + s.b), 0)
})

puzzle.run()
