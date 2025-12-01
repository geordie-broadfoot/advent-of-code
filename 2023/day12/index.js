import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle(import.meta.url)

const BROKEN = "#"
const OPERATIONAL = "."

const parseInput = (input) => {
  return input.split("\n").map((row) => {
    const [pattern, sets] = row.split(" ")

    return {
      pattern,
      sets: sets.split(",").map(Number),
    }
  })
}
const isValidPattern = ({ pattern, sets }) => {
  let p = pattern.split("")
  let groups = []
  let currentGroup = null
  for (let i = 0; i < p.length; i++) {
    if (p[i] === BROKEN && currentGroup == null) {
      currentGroup = 1
    } else if (p[i] === BROKEN) currentGroup++
    else if (p[i] !== BROKEN && currentGroup != null) {
      groups.push(currentGroup)
      currentGroup = null
    }
  }
  if (currentGroup != null) groups.push(currentGroup)

  if (groups.length != sets.length) return false
  for (let i = 0; i < groups.length; i++) {
    if (groups[i] !== sets[i]) return false
  }

  return true
}

const findSolutions = ({ pattern, sets }) => {
  const unknowns = pattern
    .split("")
    .reduce((ct, i) => (i === "?" ? ct + 1 : ct), 0)

  let regex = /\?/gi
  let indices = []
  let result
  while ((result = regex.exec(pattern))) {
    indices.push(result.index)
  }
  indices.reverse()
  let solutions = 0
  for (let i = 0; i < 2 ** unknowns; i++) {
    let newPattern = pattern.split("")

    let bin = i.toString(2)

    while (bin.length < unknowns) {
      bin = "0" + bin
    }

    let state = bin.split("").map(Number)
    for (let x = 0; x < indices.length; x++) {
      let value = state[x] === 1 ? BROKEN : OPERATIONAL

      newPattern[indices[x]] = value
    }
    const valid = isValidPattern({ pattern: newPattern.join(""), sets })
    if (valid) solutions++
    else {
    }
  }
  return solutions
}

/**
 *
 * @param {string} pattern
 * @param {number} set
 */
const findPositionsForGroup = (pattern, set) => {}

/**
 *  Recursively find the location of the next set of broken spings
 *
 */
const buildPattern = (pattern, step, startIndex, sets) => {
  let section = pattern.slice(startIndex)
  let setSize = sets[step]

  // From start of section, find the earliest possible position the set can exist
}

const findSolutionsV2 = ({ pattern, sets }) => {
  console.log("\n\n\nPattern:\n  ", pattern, "\n    ", sets.join(" "))
  const unknowns = pattern
    .split("")
    .reduce((ct, i) => (i === "?" ? ct + 1 : ct), 0)

  let regex = /\?/gi
  let indices = []
  let result
  while ((result = regex.exec(pattern))) {
    indices.push(result.index)
  }
  indices.reverse()
  // console.log("Possible combinations:", 2 ** unknowns)
  let solutions = 0

  // console.log("Solutions", solutions)
  return solutions
}

puzzle.setPart1((rawInput) => {
  const input = parseInput(rawInput)

  return input.reduce((sum, row) => {
    return sum + findSolutions(row)
  }, 0)
})

puzzle.setPart2((rawInput) => {
  let input = parseInput(rawInput)

  input = input.map((row) => {
    let newPattern = ""
    let newSets = []

    for (let i = 0; i < 5; i++) {
      newPattern += row.pattern + (i < 4 ? "?" : "")
      newSets.push(...row.sets)
    }

    return {
      pattern: newPattern,
      sets: newSets,
    }
  })

  return input.reduce((sum, row) => {
    return sum + findSolutionsV2(row)
  }, 0)
})

puzzle.run()
