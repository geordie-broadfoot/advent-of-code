import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle("Day 10, 2022")

const targetCycles = [20, 60, 100, 140, 180, 220]
let output = 0
let state = {
  cycle: 1,
  x: 1,
}

const crtOutput = []

const getCrtOutput = (cycle, pos) => {
  let crtPos = cycle

  while (crtPos > 40) crtPos -= 40

  if (crtPos == 1) {
    crtOutput.push([])
  }
  let row = crtOutput.pop()

  let isVisible = crtPos >= pos && crtPos <= pos + 2
  if (isVisible) row.push("█")
  else row.push(" ")

  crtOutput.push(row)
}

const nextCycle = (val = 0) => {
  getCrtOutput(state.cycle, state.x)
  state.cycle++
  state.x += parseInt(val)
  if (targetCycles.includes(state.cycle)) {
    // console.log('cycle', state.cycle, ':', state.x, state.x * state.cycle);
    output += state.x * state.cycle
  }
}

const processCommands = (input) => {
  input.forEach((i) => {
    let [cmd, val = 0] = i.split(" ")
    nextCycle()

    if (cmd == "addx") {
      nextCycle(val)
    }
  })
}

puzzle.setPart1((rawinput) => {
  const cmds = rawinput.split("\n")

  processCommands(cmds)
  //console.log(state.cycle);

  return output
})
puzzle.setPart2(() => {
  crtOutput.forEach((r) => console.log(r.toString().replace(/,/g, "")))
  console.log("")
  return 0
})
puzzle.run()
