import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle("Day 11, 2024")

const parseInput = (input) => {
  return input.split("\n").map((row) => {
    return row.split(" ")
  })
}

const rules = [(num) => num == 0, (num) => ("" + num).length % 2 == 0]

const blink = (stones, log = false) => {
  const newStones = []

  for (let st of stones) {
    log && console.log("looking st stone", st)
    if (rules[0](st)) {
      log && console.log("match rule 1")
      newStones.push(1)
    } else if (rules[1](st)) {
      log && console.log("match rule 2")
      st = st.toString()
      const ns1 = st.slice(0, st.length / 2)
      const ns2 = st.slice(st.length / 2, st.length)
      log && console.log("      split into ", ns1, ", ", ns2)
      newStones.push(ns1)
      newStones.push(ns2)
    } else {
      log && console.log("else rule 3")
      newStones.push(Number(st) * 2024)
    }
  }

  return newStones.map(Number)
}

puzzle.setPart1((rawInput) => {
  let stones = parseInput(rawInput)
  console.log(stones.join(" "))
  let prevLength = 0
  for (let i = 0; i < 8; i++) {
    console.log("Blink # ", i + 1, "/ 75")
    stones = blink(stones, false)
    console.log(stones.join(" "), "\n")
    console.log(
      `${stones.length}  (${
        prevLength > 0 ? stones.length - prevLength : "0"
      })\n\n`
    )
    prevLength = stones.length
  }

  return stones.length
})

const blink2 = (rocks) => {
  return Object.entries(rocks).reduce((map, [value, mult]) => {
    console.log("Looking at rock", value, "(", mult, ")")
    const newRocks = blink([value], true)

    newRocks.forEach((r) => {
      if (!map[r]) map[r] = 0
      map[r] += mult
    })

    return map
  }, {})
}

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput)
  console.log(input)

  let rockMap = input[0].reduce((map, rock) => {
    if (!map[rock]) map[rock] = 0
    map[rock] += 1
    return map
  }, {})

  console.log("Rock Lobster", rockMap)
  let blinkLimit = 75

  for (let i = 0; i < blinkLimit; i++) {
    rockMap = blink2(rockMap)
    console.log("Rock Lobster", rockMap)
  }

  return Object.values(rockMap).reduce((sum, r) => sum + r, 0)
})

puzzle.run()
