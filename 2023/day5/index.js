import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle("Day 5, 2023")

const parseInput = (input) => {
  return input.split("\n\n").reduce(
    (output, section, i) => {
      if (i === 0) {
        output.seeds = section
          .split(": ")[1]
          .split(" ")
          .map((n) => n.trim())
      }

      // Generate map
      else {
        const lines = section.split("\n")

        const title = lines[0].split(" ")[0]

        const map = {
          name: title,
          maps: [],
        }
        for (let n = 1; n < lines.length; n++) {
          const [dest, src, range] = lines[n]
            .split(" ")
            .map((n) => Number(n.trim()))

          map.maps.push({
            min: src,
            max: src + range - 1,
            dest,
          })
        }

        output.maps.push(map)
      }
      return output
    },
    {
      seeds: [],
      maps: [],
    }
  )
}

const getMin = (nums) =>
  nums.reduce((min, n) => (n < min ? n : min), 99999999999999999999999999999)

const getSeedLocations = (seeds, maps) => {
  return seeds.map((seed) => {
    let prev = Number(seed)

    for (let map of maps) {
      let next = undefined
      // Search this sections maps to find dest
      map.maps.forEach((m) => {
        if (prev >= m.min && prev <= m.max) {
          let offset = prev - m.min
          next = m.dest + offset
        }
      })

      if (next == undefined) {
      } else {
        prev = next
      }
    }

    return Number(prev)
  })
}

puzzle.setPart1((rawInput) => {
  const input = parseInput(rawInput)

  let output = 0
  const locations = getSeedLocations(input.seeds, input.maps)
  output = getMin(locations)
  return output
})

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput)

  let runningMin = Number.MAX_VALUE

  for (let i = 0; i < input.seeds.length; i += 2) {
    let start = Number(input.seeds[i])
    let len = Number(input.seeds[i + 1])
    console.log("Seeds from", start, "to", start + len - 1)
    for (let n = start; n < start + len - 1; n++) {
      //console.log("Running seed #", n)
      const [location] = getSeedLocations([n], input.maps)
      if (location < runningMin) runningMin = location
    }
  }

  return runningMin
})

puzzle.run()
