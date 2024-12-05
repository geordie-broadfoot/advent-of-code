import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle("Day 5, 2024")

const parseInput = (input) => {
  const rules = input
    .split("\n\n")[0]
    .split("\n")
    .map((row) => {
      return row.split("|").map(Number)
    })

  const updates = input
    .split("\n\n")[1]
    .split("\n")
    .map((row) => row.split(",").map(Number))

  return { rules, updates }
}

const isRuleValid = (update, rule) => {
  let foundFirst = false
  let foundSecond = false

  for (let n of update) {
    if (n === rule[0]) foundFirst = true

    if (n === rule[1]) foundSecond = true

    if (foundSecond && !foundFirst) return false
  }
  return true
}

const getRulesToApply = (update, rules) =>
  rules.filter((rule) => rule.every((n) => update.includes(n)))

const validateUpdates = (update, ruleList) => {
  const rules = getRulesToApply(update, ruleList)

  for (const r of rules) {
    if (!isRuleValid(update, r)) {
      return false
    }
  }
  return true
}

const getMiddlePage = (u) => u[u.length / 2 - 0.5]

puzzle.setPart1((rawInput) => {
  const input = parseInput(rawInput)

  const validUpdates = input.updates.filter((u) =>
    validateUpdates(u, input.rules)
  )

  return validUpdates.map(getMiddlePage).reduce((a, n) => a + n, 0)
})

const processInvalidUpdates = (update, ruleList) => {
  let isOrdered = false
  let passes = 0

  while (!isOrdered) {
    const rules = getRulesToApply(update, ruleList)
    let order = true
    for (let r of rules) {
      if (order && !isRuleValid(update, r)) {
        // Get index of pages that apply to this rule
        order = false
        let i1 = update.indexOf(r[0])
        let i2 = update.indexOf(r[1])

        let t = update[i1 - 1]

        update[i1] = r[1]
        update[i2] = r[0]
      }
    }
    if (order) isOrdered = true
  }

  return update
}

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput)

  const updates = input.updates.filter((u) => !validateUpdates(u, input.rules))

  let sorted = updates.map((u) => processInvalidUpdates(u, input.rules))

  return sorted.map(getMiddlePage).reduce((a, n) => a + n, 0)
})

puzzle.run()
