import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle(import.meta.url)

const parseCrates = (rows = []) => {
  //let rows = str.split('\n');
  let rg = /\[([A-Z]+)\]/g
  let match

  let crates = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
  }

  for (let i = 0; i < rows.length; i++) {
    while ((match = rg.exec(rows[i]))) {
      crates[match.index / 4 + 1].unshift(match[1])
    }
  }

  return crates
}

const printCrates = (crates) => {
  let msg = ""
  for (let i = 1; i < 10; i++) {
    msg = `${i}: ${crates[i].toString()}`
    console.log(msg)
  }
}

const getTopCrates = (crates) => {
  let msg = ""

  for (let i = 1; i < 10; i++) msg += crates[i][crates[i].length - 1] ?? " "

  return msg
}

const moveCrates = (crates, commands, craneType) => {
  for (let i = 0; i < commands.length; i++) {
    let [, amount, , source, , dest] = commands[i].split(" ")

    let cr = []
    for (let n = 0; n < amount; n++) cr.push(crates[source].pop())

    if (craneType === 9000) cr.reverse()

    for (let n = 0; n < amount; n++) crates[dest].push(cr.pop())
  }
}

puzzle.setPart1((input) => {
  let inp = input.split("\n")
  let cr = inp.slice(0, inp.indexOf(""))
  let commands = inp.slice(inp.indexOf("") + 1)

  // part 1
  let crates = parseCrates(cr)
  //printCrates(crates)
  moveCrates(crates, commands, 9000)
  return getTopCrates(crates)
})

puzzle.setPart2((input) => {
  // part 2
  let inp = input.split("\n")
  let cr = inp.slice(0, inp.indexOf(""))
  let commands = inp.slice(inp.indexOf("") + 1)
  let crates = parseCrates(cr)
  moveCrates(crates, commands, 9001)
  return getTopCrates(crates)
})

puzzle.run()
