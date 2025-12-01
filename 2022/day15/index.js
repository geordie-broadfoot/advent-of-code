import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle("Day 15, 2022")

const parseInput = (input) => {
  let result = []
  let rows = input.split("\n")

  rows.forEach((row) => {
    let [, , x, y, , , , , bX, bY] = row.split(" ")

    let sensor = {
      pos: {
        x: parseInt(x.slice(2, -1)),
        y: parseInt(y.slice(2, -1)),
      },
      beacon: {
        x: parseInt(bX.slice(2, -1)),
        y: parseInt(bY.slice(2)),
      },
    }

    sensor.range =
      Math.abs(sensor.pos.x - sensor.beacon.x) +
      Math.abs(sensor.pos.y - sensor.beacon.y)

    result.push(sensor)
  })

  return result
}

const getCoverageSlice = (s, line) => {
  if (s.pos.y + s.range < line || s.pos.y - s.range > line) return []
  let offset = Math.abs(line - s.pos.y)
  let sliceLength = s.range - offset
  let startX = s.pos.x - sliceLength
  let endX = s.pos.x + sliceLength

  return [startX, endX]
}

const convertToRangeReducer = (a, s) => {
  //console.log('a', a);
  if (a.length == 0) {
    return [s]
  }
  let addedToRange = false
  for (let i = 0; i < a.length; i++) {
    let group = a[i]
    if (s[0] <= group[0] && s[1] >= group[0]) {
      //console.log('combining to bottom', group, s);
      addedToRange = true
      group[0] = s[0]
      if (s[1] > group[1]) group[1] = s[1]
      break
    } else if (s[1] >= group[1] && s[0] <= group[1]) {
      //console.log('combining to top', group, s);
      addedToRange = true
      group[1] = s[1]
      if (s[0] < group[0]) group[0] = s[0]
      break
    } else if (s[0] >= group[0] && s[1] <= group[1]) {
      //console.log('group contains values already', group, s);
      addedToRange = true
      break
    }
  }
  if (!addedToRange) a.push(s)
  return a
}

const findCoverageAt = (input, line) => {
  let coverage = []

  input.forEach((s) => {
    {
      let c = getCoverageSlice(s, line)
      if (c.length) coverage.push(c)
    }
  })

  coverage = coverage.sort((a, b) => a[0] - b[0])
  coverage = coverage.reduce(convertToRangeReducer, [])

  return coverage
}
let testing = false

puzzle.setPart1((rawInput, testing) => {
  const input = parseInput(rawInput)
  let coverage = findCoverageAt(input, testing ? 10 : 2000000)

  return coverage.reduce((a, s) => {
    return (a += s[1] - s[0])
  }, 0)
})

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput)

  // part 2
  // let max = testing ? 20 : 4000000
  let max = 4000000
  for (let y = 0; y <= max; y++) {
    let coverage = findCoverageAt(input, y)
    coverage.forEach((c) => {
      if (c[0] < 0) c[0] = 0
      if (c[1] > max) c[1] = max
    })
    if (coverage.length > 1) {
      if (coverage[0][1] + 1 != coverage[1][0]) {
        const freq = (coverage[0][1] + 1) * 4000000 + y
        // console.log(`beacon must be at {x: ${coverage[0][1] + 1}, y:${y}} `)
        // console.log("tuning frequency: ", freq)
        return freq
      }
    }
  }

  return max
})

puzzle.run()
