import { Puzzle } from "../../utils/puzzle.cjs"
import { forEachCell } from "../../utils/helpers/grids/index.js"
const puzzle = new Puzzle("Day 1, 2023")

// Turn into 2d array --- maybe a map would be better?
const parseInput = (input) => {
  return input.split("\n").map((row, y) =>
    row.split("").map((t, x) => ({
      visited: false,
      perimeter: 0,
      region: null,
      type: t,
      x,
      y,
    }))
  )
}

const getTile = (map, pos) => {
  try {
    return map[pos.y][pos.x]
  } catch {
    return null
  }
}

const getNeighbours = (map, { x, y }) => [
  getTile(map, { x: x + 1, y: y + 0 }),
  getTile(map, { x: x + 0, y: y - 1 }),
  getTile(map, { x: x - 0, y: y + 1 }),
  getTile(map, { x: x - 1, y: y + 0 }),
]

const toCoord = (pos) => pos.x + "," + pos.y
const toPos = (coord) => ({
  x: Number(coord.split(",")[0]),
  y: Number(coord.split(",")[1]),
})

const exploreRegion = (map, start) => {
  const region = []
  console.log("Beginning to explore a region!")

  const queue = [toCoord(start)]

  while (queue.length > 0) {
    let cCoord = queue.shift()

    // console.log("Pos", cCoord)

    let cPos = toPos(cCoord)

    let tile = getTile(map, cPos)

    if (tile.visited) continue
    region.push(cCoord)

    tile.visited = true

    const neighbours = getNeighbours(map, cPos)

    // Look at neighbours
    neighbours.forEach((nb) => {
      console.log("Looking at nbs:", nb)
      if (nb == null) {
        console.log("Found edge of map")
        tile.perimeter += 1
      } else if (nb.type !== tile.type) {
        console.log("Found another region")
        tile.perimeter += 1
      } else if (!nb.visited && nb.type == tile.type) {
        console.log("Adding same region to queue")
        queue.push(toCoord({ x: nb.x, y: nb.y }))
      }
    })
  }

  console.log("Region is: ", region.sort(), region.length, "\n\n")
  return region
}

const findRegions = (map) => {
  const regions = {}
  // Calculate region data for map
  forEachCell(map, ({ x, y, value: tile }) => {
    if (!tile.region) {
      // No region has been set - begin new region
      const region = exploreRegion(map, { x, y })

      // Check all of the tiles to see if any have a region set
      const n = region.reduce((n, crd) => {
        if (n) return n

        const t = getTile(map, toPos(crd))

        if (t.region != null) return t.region

        return n
      }, null)

      let regionName = ""
      if (n != null) regionName = n
      else {
        // See how many other regions of this type exist
        console.log("registering a new region! hooray!")
        const otherRegionCt = Object.keys(regions).reduce((sum, r) => {
          if (r.slice(0, 1) == tile.type) sum++
          return sum
        }, 0)

        regionName = tile.type + "-" + (otherRegionCt + 1)
      }

      console.log("I will call you...", regionName)

      regions[regionName] = region.reduce(
        (a, c) => {
          const t = getTile(map, toPos(c))
          console.log("Looking at region ", t.region, t)
          a.perimeter += t.perimeter
          a.area++
          return a
        },
        {
          perimeter: 0,
          area: 0,
        }
      )
      region.forEach((c) => {
        const t = getTile(map, toPos(c))
        t.region = regionName
      })
    }
  })

  // Reduce map down to whole regions
  return regions
}

puzzle.setPart1((rawInput) => {
  const map = parseInput(rawInput)
  const regions = findRegions(map)
  console.log("Regions:", regions)

  return Object.values(regions).reduce(
    (sum, reg) => sum + reg.perimeter * reg.area,
    0
  )
})

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput)

  let output = 0

  return output
})

puzzle.run()
