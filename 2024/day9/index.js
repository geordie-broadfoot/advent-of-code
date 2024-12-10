import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle("Day 9, 2024")

const parseInput = (input) => {
  return input.split("")
}

const pad = (msg, count, char) => {
  for (let i = 0; i < count; i++) msg += char.toString()
  return msg
}

const toFileMap = (input) => {
  let fileId = 0
  return input
    .reduce((msg, f, i) => {
      // Even number - is file
      if (i == 0 || i % 2 == 0) {
        msg = pad(msg, f, fileId + ",")
        fileId++
      }
      // Odd nubmer - is space
      else {
        msg = pad(msg, f, ".,")
      }

      return msg
    }, "")
    .split(",")
    .slice(0, -1)
}

const isMapSorted = (map) =>
  map.reduce((sorted, item, i) => {
    if (!sorted) return sorted

    const next = i + 1 >= map.length ? null : map[i + 1]

    if (!next) return sorted

    if (item === "." && next !== ".") {
      sorted = false
    }

    return sorted
  }, true)

const findFirstOpenIndex = (map) => {
  const m = [...map]

  for (let i = 0; i < m.length; i++) {
    if (m[i] === ".") return i
  }
  return -1
}

const findLastDigit = (map) => {
  const m = [...map]
  m.reverse()

  for (let i = 0; i < m.length; i++) {
    if (m[i] !== ".") return m.length - i - 1
  }
  return -1
}

const toSortedMap = (map) => {
  while (!isMapSorted(map)) {
    const emptyIndex = findFirstOpenIndex(map)
    const targetIndex = findLastDigit(map)

    let v = map[targetIndex]
    map[targetIndex] = "."
    map[emptyIndex] = v
  }
  return map
}

const toChecksum = (map) =>
  map.reduce((sum, item, i) => {
    if (item !== ".") sum += Number(item) * i

    return sum
  }, 0)

puzzle.setPart1((rawInput) => {
  const input = parseInput(rawInput)
  const map = toFileMap(input)
  const sorted = toSortedMap(map)

  let output = toChecksum(sorted)

  return output
})

const getFileNumbers = (map) => {
  return map
    .join(",")
    .replace(/\.,/g, "")
    .split(",")
    .reduce((files, f) => {
      if (files.at(-1) !== f) files.push(f)
      return files
    }, [])
    .reverse()
}

const findGap = (map, size) => {
  let gapSize = 0
  let gapStart = -1

  for (let i = 0; i < map.length; i++) {
    if (map[i] !== ".") {
      // End of a gap
      if (gapSize >= size) {
        // Gap is big enough
        return gapStart
      }
      gapStart = -1
      gapSize = 0
    }

    if (map[i] === ".") {
      if (gapStart === -1) gapStart = i
      gapSize++
    }
  }

  // Never found a big enough gap
  return -1
}

const findFilePosition = (map, file) => {
  const m = [...map]
  const start = m.indexOf(file)
  m.reverse()
  const end = m.length - m.indexOf(file)

  return { start, end, size: end - start }
}

const toSortedMapV2 = (map) => {
  const files = getFileNumbers(map)

  // Attempt to move each file
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    console.log("Checking file", file)

    const pos = findFilePosition(map, file)
    const gap = findGap(map, pos.size)
    // console.log("    file is at", pos)
    // console.log("    gap:", gap != -1 ? gap : "no gap found")
    // Couldn't find a gap
    if (gap === -1 || gap > pos.start) continue
    // console.log(file, pos, gap)
    // console.log(map.join(""))
    // Swap file with space

    // map.splice(gap, pos.size, file)
    // map.splice(pos.start, pos.size, ".")

    for (let n = 0; n < pos.size; n++) {
      map[gap + n] = file
      map[pos.start + n] = "."
    }

    // console.log(map.join(""))
  }

  return map
}

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput)
  const map = toFileMap(input)
  const sorted = toSortedMapV2(map)
  // console.log("    Map:", sorted.join(""))
  // console.log("OG Map: ", "00992111777.44.333....5555.6666.....8888..")
  return toChecksum(sorted)
  console.
})

puzzle.run()
