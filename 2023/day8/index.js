import { Puzzle } from "../../utils/day.cjs"

const puzzle = new Puzzle("Day 8")

const parseInput = (input) => {
  const steps = input
    .split("\n\n")[0]
    .split("")
    .map((n) => (n == "R" ? 1 : 0))

  let map = input
    .split("\n\n")[1]
    .split("\n")
    .reduce((m, row) => {
      const [source, left, right] = row.split(" ")

      m[source] = [left, right]

      return m
    }, {})

  return {
    steps,
    map,
  }
}

{
  console.log("Part 1")

  const input = parseInput(puzzle.getInput(1))

  let steps = 0
  let current = "AAA"

  while (current != "ZZZ") {
    current = input.map[current][input.steps[steps++ % input.steps.length]]
  }

  console.log("Output:", steps)
}

{
  console.log("Part 2")

  const input = parseInput(puzzle.getInput(2))

  let finished = false
  let steps = 0

  const positions = Object.keys(input.map).filter((k) => k[2] == "A")
  //console.log(positions)
  const startingPositions = [...positions]

  // Record the distance between steps when a __Z tile is reached
  let res = {}

  // Find the loop lengths of each starting position
  while (!finished) {
    finished = true

    const dir = input.steps[steps % input.steps.length]

    for (let i = 0; i < positions.length; i++) {
      const next = input.map[positions[i]][dir]

      //console.log(positions[i], " ---> ", next, dir)
      positions[i] = next

      if (positions[i][2] != "Z") finished = false
      else {
        const pos = startingPositions[i]
        if (!res[pos]) res[pos] = []
        if (res[pos].length < 2) res[pos].push(steps + 1)
        //console.log(res)

        if (
          Object.keys(res).length === 6 &&
          Object.values(res).reduce((t, v) => {
            if (t == false) return false

            return v.length > 1
          }, true)
        ) {
          finished = true
        }
      }
    }
    steps++

    for (let i = 0; i < 10000; i++) {}
  }

  const intervals = Object.entries(res).reduce((i, [k, v]) => {
    i.push({
      pos: k,
      start: v[0],
      length: v[1] - v[0],
      current: 0,
    })
    return i
  }, [])

  let searching = true
  let current = intervals[0].start
  while (searching) {
    searching = false

    // Increment the loops to find the final value
    for (let i of intervals) {
      while (i.current < current) i.current += i.length

      if (i.current > current) {
        current = i.current
        searching = true
      }
    }
  }

  console.log("Output:", intervals[0].current)
}
