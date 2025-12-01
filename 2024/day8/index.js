import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle(import.meta.url)

const parseInput = (input) => {
  const towerTypes = input.split("").reduce((types, t) => {
    if (t === "." || t === "\n") return types
    if (!types.includes(t)) return [...types, t]
    return types
  }, [])

  const grid = input.split("\n").map((row) => {
    return row.split("")
  })

  const typeCoords = {}

  towerTypes.forEach((t) => {
    forEachCell(grid, ({ value, x, y }) => {
      if (value === t) {
        if (!typeCoords[t]) typeCoords[t] = []

        typeCoords[t].push({
          x,
          y,
        })
      }
    })
  })

  return {
    types: towerTypes,
    map: grid,
    limits: [grid.length, grid[0].length],
    typeCoords,
  }
}

const printMap = (map) =>
  console.log(
    map
      .map((r) =>
        r.map((t) => (t.includes("X") && t.includes(".") ? "X" : t[0])).join("")
      )
      .join("\n")
  )

const markAntinode = (map, pos) => {
  try {
    const t = map[pos.y][pos.x]

    if (!t.includes("X")) {
      map[pos.y][pos.x] += "X"
      return true
    }
  } catch {}
  return false
}

puzzle.setPart1((rawInput) => {
  const input = parseInput(rawInput)

  let antinodeCount = 0
  // Iterate over each tower type
  for (let type of input.types) {
    // Iterate over each tower and get distance to every other tower to calculate antinode
    const towers = input.typeCoords[type]

    for (let x = 0; x < input.typeCoords[type].length - 1; x++) {
      for (let y = x + 1; y < input.typeCoords[type].length; y++) {
        const t1 = input.typeCoords[type][x]
        const t2 = input.typeCoords[type][y]

        const dX = t1.x - t2.x
        const dY = t1.y - t2.y

        // calculate antinodes
        const an1 = {
          x: t1.x + dX,
          y: t1.y + dY,
        }

        const an2 = {
          x: t2.x - dX,
          y: t2.y - dY,
        }

        if (markAntinode(input.map, an1)) antinodeCount++
        if (markAntinode(input.map, an2)) antinodeCount++
      }
    }
  }
  printMap(input.map)
  return antinodeCount
})

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput)

  let antinodeCount = 0
  // Iterate over each tower type
  for (let type of input.types) {
    // Iterate over each tower and get distance to every other tower to calculate antinode
    const towers = input.typeCoords[type]

    for (let x = 0; x < input.typeCoords[type].length - 1; x++) {
      for (let y = x + 1; y < input.typeCoords[type].length; y++) {
        const t1 = input.typeCoords[type][x]
        const t2 = input.typeCoords[type][y]

        const dX = t2.x - t1.x
        const dY = t2.y - t1.y

        // calculate antinodes in dir 1
        const antinodes = []
        let onMap = true
        let currentPos = t1
        while (onMap) {
          const an = {
            x: currentPos.x + dX,
            y: currentPos.y + dY,
          }

          try {
            let t = input.map[an.y][an.x]
            antinodes.push(an)
            currentPos = an
          } catch (e) {
            onMap = false
          }
        }

        // calculate antinodes in opposite dir
        onMap = true
        currentPos = t2
        while (onMap) {
          const an = {
            x: currentPos.x - dX,
            y: currentPos.y - dY,
          }

          try {
            let t = input.map[an.y][an.x]
            antinodes.push(an)
            currentPos = an
          } catch {
            onMap = false
          }
        }

        antinodes.forEach((an) => {
          if (markAntinode(input.map, an)) antinodeCount++
        })
      }
    }
  }
  printMap(input.map)
  return antinodeCount
})

puzzle.run()
