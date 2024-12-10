import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle("Day 1, 2023")

puzzle.setPart1((rawInput) => {
  const input = parseInput(rawInput)

  // part 1
  //console.log(input);

  let pos = "AA"

  findNextMove({ pos, input, flowRate: 0, output: 0, time: 30 })

  console.log("total output achieved:", result)

  return result
})

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput)

  // part 1
  //console.log(input);

  let pos = "AA"

  findNextMove({ pos, input, flowRate: 0, output: 0, time: 30 })

  console.log("total output achieved:", result)
  let output = 0

  return result
})

puzzle.run()

let testing = false
let result = 0

function findNextMove(state) {
  let { pos, time, output, flowRate, input } = state
  let closedValves = Object.values(input)
    .filter((v) => !v.open)
    .map((v) => {
      return {
        ...v,
        timeToOpen: getShortestPath(input, pos, v.pos).length + 1,
      }
    })
    .filter((v) => v.timeToOpen < time)

  // for (let v of Object.values(input)) {
  //     if (!v.open) closedValves.push(v);
  // }

  if (!closedValves.length) {
    //console.log(`opened all valves with ${time} turns left`);
    if (time > 0) {
      output += flowRate * time
    }
    if (output > result) result = output
    return
  }

  for (let i = 0; i < closedValves.length; i++) {
    let v = closedValves[i]

    // move to and open valve
    let newTime = time - v.timeToOpen // time to open
    let newPos = v.pos
    let newOutput = output + flowRate * v.timeToOpen
    let newInput = JSON.parse(JSON.stringify(input))
    newInput[v.pos].open = true
    let newFlowRate = flowRate + input[v.pos].rate

    findNextMove({
      pos: newPos,
      time: newTime,
      input: newInput,
      output: newOutput,
      flowRate: newFlowRate,
    })
  }
}

function getShortestPath(input, pos, target) {
  // simple BFS to find shortest path
  let queue = [pos]
  let visited = { pos: true }
  let parent = { pos: null }

  while (queue.length) {
    let current = queue.shift()

    if (current == target) {
      break
    }
    for (let t of input[current].links) {
      if (!visited[t]) {
        visited[t] = true
        queue.push(t)
        parent[t] = current
      }
    }
  }

  let path = [target]
  let e = target
  while (parent[e]) {
    if (parent[e] == pos) break
    path.push(parent[e])
    e = parent[e]
  }
  return path.reverse()
}

function potentialOutput(valve, time) {
  //console.log(valve);
  return valve.rate * time
}

function parseInput(input) {
  let rows = input.split("\n")
  let result = {}

  rows.forEach((n) => {
    let [, valve, , , r, , , , , ...targets] = n.split(" ")

    let rate = parseInt(r.split("=")[1].slice(0, -1))

    result[valve] = {
      pos: valve,
      reserved: false,
      open: rate == 0, // count 0-flow valves as open
      rate: rate,
      links: targets.map((t) => t.replace(",", "")),
    }
  })

  return result
}
