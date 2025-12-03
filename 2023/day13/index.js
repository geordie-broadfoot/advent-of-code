import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle(import.meta.url)

const parseInput = (input) => {
  let panels = input.split("\n\n")

  let output = panels.map((panel) => {
    let map = panel.split("\n").map((r) => r.split(""))

    let rows = []
    let cols = []
    for (let y = 0; y < map.length; y++) {
      let row = []
      for (let x = 0; x < map[0].length; x++) {
        row.push(map[y][x])
      }
      rows.push(row.join(""))
    }
    for (let x = 0; x < map[0].length; x++) {
      let col = []
      for (let y = 0; y < map.length; y++) {
        col.push(map[y][x])
      }
      cols.push(col.join(""))
    }

    return {
      rows,
      cols,
    }
  })

  return output
}

const isMirrored = (rows, index, pt2) => {
  let log = ""
  let comparisons = 0
  let differences = 0
  for (let one = index, two = index + 1; one >= 0; one--, two++) {
    if (two == rows.length) break

    log = rows[one] + "\n" + log
    log += rows[two] + "\n"

    for (let i = 0; i < rows[one].length; i++) {
      if (rows[one][i] !== rows[two][i]) differences++
    }
    // Part 1 logic
    if (!pt2) {
      if (rows[one] !== rows[two]) {
        log += differences
        return false
      }
    } else {
      if (differences > 1) return false
    }
    comparisons++
  }
  if (pt2) return comparisons > 0 && differences == 1
  else return comparisons > 0
}

const findMirror = (lines, pt2 = false) => {
  let mirrorIndex = null

  for (let i = 0; i < lines.length; i++) {
    if (isMirrored(lines, i, pt2)) {
      mirrorIndex = i + 1
    }
  }

  return mirrorIndex
}

puzzle.setPart1((rawInput) => {
  const input = parseInput(rawInput)
  let output = 0

  input.forEach((puzz) => {
    let horizontal = findMirror(puzz.cols)

    if (horizontal !== null) {
      output += horizontal
    } else {
      let vertical = findMirror(puzz.rows)

      if (vertical !== null) {
        output += 100 * vertical
      } else {
      }
    }
  })

  return output
})

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput)

  let output = 0

  input.forEach((puzz) => {
    let horizontal = findMirror(puzz.cols, true)

    if (horizontal !== null) {
      output += horizontal
    } else {
      let vertical = findMirror(puzz.rows, true)

      if (vertical !== null) {
        output += 100 * vertical
      } else {
      }
    }
  })

  return output
})

puzzle.run()
