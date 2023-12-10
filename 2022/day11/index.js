import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle("Day 11, 2022")

const parseInput = (input) => {
  let rows = input.split("\n")
  let monkeys = []
  for (let i = 0; i < rows.length; i += 7) {
    let monkey = {
      id: parseInt(rows[i].split(" ")[1].replace(/:/, "")),
      items: rows[i + 1]
        .split(": ")[1]
        .split(",")
        .reduce((acc, i) => {
          acc.push(i.trim())
          return acc
        }, []),
      op: rows[i + 2].split(" = ")[1],
      test: {
        val: parseInt(rows[i + 3].split(" by ")[1]),
        true: parseInt(rows[i + 4].split(" monkey ")[1]),
        false: parseInt(rows[i + 5].split(" monkey ")[1]),
      },
      ins: 0,
    }

    monkeys.push(monkey)
  }
  return monkeys
}

const doOp = (val, operation) => {
  let [p1, op, p2] = operation.split(" ")

  if (p2 == "old") p2 = parseInt(val)
  else p2 = parseInt(p2)
  p1 = parseInt(val)

  let result
  if (op == "+") result = p1 + p2
  else if (op == "*") result = p1 * p2

  return result
}

const playRound = (monkeys, pt2 = false) => {
  let lcd = monkeys.reduce((acc, i) => acc * i.test.val, 1)

  let divisor = pt2 ? 1 : 3
  for (let i = 0; i < monkeys.length; i++) {
    let m = monkeys[i]

    while (m.items.length) {
      m.ins++
      let item = m.items.shift()
      let val = Math.floor(doOp(item, m.op) / divisor) % lcd
      let res = val % m.test.val == 0
      monkeys[m.test[res]].items.push(val)
    }
  }
}

const getScores = (monkeys) => {
  monkeys.sort((a, b) => {
    return b.ins - a.ins
  })

  // Get top 2 scores
  let p1 = monkeys[0].ins
  let p2 = monkeys[1].ins
  //console.log(monkeys)
  console.log(`${p1} * ${p2} = ${p1 * p2}\n`)
  return p1 * p2
}

puzzle.setPart1((rawinput) => {
  const monkeys = parseInput(rawinput)
  for (let i = 0; i < 20; i++) {
    playRound(monkeys)
  }
  let score = getScores(monkeys)

  return score
})

puzzle.setPart2((rawinput) => {
  const monkeys = parseInput(rawinput)

  for (let i = 0; i < 10000; i++) {
    playRound(monkeys, true)
  }

  return getScores(monkeys)
})

puzzle.run()
