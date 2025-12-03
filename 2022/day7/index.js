import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle(import.meta.url)

const TOTAL_FS_ROOM = 70000000
const REQUIRED_SPACE = 30000000
let dirCount = 0
let maxDepth = 0

const parseDirectory = (fileSystem, input, depth = 0) => {
  fileSystem["totalSize"] = 0

  if (depth > maxDepth) maxDepth = depth

  while (input.length > 0) {
    let cmd = input.shift()
    if (cmd.startsWith("$")) {
      if (cmd.startsWith("$ cd")) {
        if (cmd.includes("..")) return fileSystem

        let dir = cmd.split(" ")[2]
        parseDirectory(fileSystem[dir], input, depth++)
        fileSystem["totalSize"] += fileSystem[dir]["totalSize"]
      }
    } else if (cmd.startsWith("dir")) {
      dirCount++
      let dir = cmd.split(" ")[1]
      fileSystem[dir] = {}
    } else if (cmd.match(/^\d/)) {
      let [size] = cmd.split(" ")
      fileSystem["totalSize"] += parseInt(size)
    }
  }

  return fileSystem
}

const findDirectories = (fileSystem, filter, result = []) => {
  Object.keys(fileSystem).forEach((key) => {
    if (typeof fileSystem[key] === "object" && fileSystem[key] !== null) {
      let dirSize = fileSystem[key]["totalSize"]
      if (filter(dirSize)) {
        result.push({ key, size: dirSize })
      }
      findDirectories(fileSystem[key], filter, result)
    }
  })
  return result
}

puzzle.setPart1((rawInput) => {
  let rows = rawInput.split("\n")

  let fs = parseDirectory({ "/": {} }, rows)
  console.log(dirCount, "unique dirs found")
  console.log("max dir depth found:", maxDepth)

  // part 1
  let sum = findDirectories(fs, (dir) => dir <= 100000)
  return sum.reduce((acc, a) => {
    return a.size + acc
  }, 0)
})

puzzle.setPart2((rawInput) => {
  // part 2
  let rows = rawInput.split("\n")

  let fs = parseDirectory({ "/": {} }, rows)
  let freeSpace = TOTAL_FS_ROOM - fs["/"]["totalSize"]
  let spaceToClear = REQUIRED_SPACE - freeSpace

  let dirs = findDirectories(fs, (dir) => dir >= spaceToClear)

  dirs.sort((a, b) => {
    return a.size - b.size
  })

  return dirs[0].size
})

puzzle.run()
