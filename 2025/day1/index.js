import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle("Day 1, 2023")

const parseInput = (input) => {
  return input.split('\n')
}

puzzle.setPart1((rawInput) => {
  const input = parseInput(rawInput)
  
  let current = 50
  let hits = 0

  for (let row of input) {
    const dir = row[0] == "L" ? -1 : 1
    const amt = row.slice(1)
    const move = dir * amt

    current += move

    while (current >= 100) {
      current -= 100
    }
    while (current < 0) {
      current += 100
    }

    if (current == 0) hits++

  }
  


  let output = hits

  return output
})

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput)
  
  let current = 50
  let hits = 0

  for (let row of input) {
    const dir = row[0] == "L" ? -1 : 1
    const amt = Number.parseInt(row.slice(1))

    for (let i = 0; i < amt; i++) {
      current += dir

      if (current == 100) current = 0;
      if (current == -1) current = 99;

      if (current == 0) hits++
    }
    


  }
  


  let output = hits

  return output
})

puzzle.run()
