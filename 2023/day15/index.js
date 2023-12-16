import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle("Day 15, 2023")

const parseInput = (input) => {
  return input.split(",")
}

const getValue = (string, initialValue = 0) => {
  let output = initialValue

  for (let i = 0; i < string.length; i++) {
    let charValue = string.charCodeAt(i)
    output += charValue
    output *= 17
    output = output % 256
  }

  return output
}

const toLens = (input) => {
  if (input[input.length - 1] === "-") {
    return {
      label: input.slice(0, -1),
      op: "remove",
    }
  } else {
    return {
      label: input.split("=")[0],
      op: "replace",
      f: input.split("=")[1],
    }
  }
}

puzzle.setPart1((rawInput) => {
  const input = parseInput(rawInput)

  return input.reduce((sum, row) => sum + getValue(row), 0)
})

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput)

  const lenses = input.map(toLens)

  let boxes = {}

  for (let lens of lenses) {
    let score = getValue(lens.label)

    if (lens.op === "remove") {
      if (!boxes[score]) continue

      boxes[score] = boxes[score].filter((l) => l.label !== lens.label)
    } else {
      if (!boxes[score]) boxes[score] = []

      let index = boxes[score].reduce((ind, l, i) => {
        if (l.label === lens.label) return i
        return ind
      }, -1)

      if (index === -1) boxes[score].push({ label: lens.label, f: lens.f })
      else
        boxes[score].splice(index, 1, {
          label: lens.label,
          f: lens.f,
        })
    }
  }

  return Object.entries(boxes).reduce((output, [boxNum, lensList]) => {
    let boxScore = 0
    console.log("Box ", boxNum, lensList)
    for (let i = 0; i < lensList.length; i++) {
      let lensScore = (Number(boxNum) + 1) * (i + 1) * lensList[i].f
      console.log(
        `${Number(boxNum) + 1} * ${i + 1} * ${lensList[i].f} = ${lensScore}`
      )
      console.log("   ", lensList[i].label, ":", lensScore)
      boxScore += lensScore
    }

    return output + boxScore
  }, 0)
})

puzzle.run()
