import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle(import.meta.url)

const searchSize = (input, size) => {
  for (let i = 0; i < input.length; i++) {
    let str = Array.from(input.substr(i, size))

    let unique = true
    while (str.length > 0) {
      let tgt = str.pop()
      if (str.includes(tgt)) unique = false
    }

    if (unique) {
      return i + size
    }
  }
}

puzzle.setPart1((input) => {
  return searchSize(input, 4)
})

puzzle.setPart2((input) => {
  return searchSize(input, 14)
})

puzzle.run()
