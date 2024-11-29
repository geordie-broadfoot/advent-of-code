import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle("Day 19, 2023")

const parseInput = (input) => {
  let output = {}

  output.parts = input
    .split("\n\n")[1]
    .split("\n")
    .map((row) => {
      let [x, m, a, s] = row
        .slice(1, -1)
        .split(",")
        .map((p) => Number(p.split("=")[1]))
      return {
        x,
        m,
        a,
        s,
        history: [],
      }
    })

  output.workflows = input
    .split("\n\n")[0]
    .split("\n")
    .reduce((list, row) => {
      const [name, cmdStr] = row.slice(0, -1).split("{")

      list[name] = cmdStr.split(",").map((cmd) => {
        if (!cmd.includes(":"))
          return {
            predicate: null,
            result: cmd,
          }

        const [predicate, result] = cmd.split(":")

        return {
          predicate,
          result,
        }
      })

      return list
    }, {})

  return output
}

const doWorkflow = (list, name, part) => {
  part.history.push(name)

  if (name === "A" || name === "R") {
    part.accepted = name === "A"
    return
  }

  const workflow = list[name]

  for (let step of workflow) {
    //console.log(step)
    if (!step.predicate) {
      // No predicate - go straight into result
      return doWorkflow(list, step.result, part)
    }

    const property = step.predicate.slice(0, 1)
    const comparison = step.predicate.slice(1, 2)
    const value = Number(step.predicate.slice(2, step.predicate.length))

    if (comparison === ">") {
      if (part[property] > value) {
        // Proceed to result
        return doWorkflow(list, step.result, part)
      }
    } else {
      if (part[property] < value) {
        // Proceed to result
        return doWorkflow(list, step.result, part)
      }
    }
  }
}

const reverseEngineerWorkflow = (workflow) => {}

puzzle.setPart1((rawInput) => {
  const input = parseInput(rawInput)

  input.parts.forEach((part) => {
    doWorkflow(input.workflows, "in", part)
  })

  return input.parts
    .filter((part) => part.accepted)
    .reduce((sum, p) => {
      return sum + p.x + p.m + p.a + p.s
    }, 0)
})

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput)

  let output = 0

  return output
})

puzzle.run()
