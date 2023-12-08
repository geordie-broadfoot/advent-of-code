import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle("Day 1, 2023")

const numberMap = {
  "^one": "1",
  "^two": "2",
  "^three": "3",
  "^four": "4",
  "^five": "5",
  "^six": "6",
  "^seven": "7",
  "^eight": "8",
  "^nine": "9",
}

puzzle.setPart1((rawinput) => {
  let sum = 0

  const input = rawinput.split("\n")

  for (let i = 0; i < input.length; i++) {
    let row = input[i]

    const numbers = row.replaceAll(/[a-z]/g, "").split("")

    const value = numbers[0] + numbers.slice(-1)

    sum += Number(value)
  }
  return sum
})

puzzle.setPart2((rawinput) => {
  const input = rawinput.split("\n")

  let sum = 0
  for (let i = 0; i < input.length; i++) {
    let row = input[i]

    const numbers = []

    //parse the string
    while (row.length > 0) {
      let foundMatch = false

      if (row.match(/^[0-9]/)) {
        foundMatch = true
        numbers.push(row[0])
        row = row.substring(1)
      }
      //look for text values
      if (!foundMatch) {
        Object.entries(numberMap).forEach(([k, v]) => {
          if (row.match(k) && !foundMatch) {
            foundMatch = true
            numbers.push(v)
            row = row.substring(k.length - 2)
          }
        })
      }

      if (!foundMatch) {
        row = row.substring(1)
      }
    }

    const first = numbers[0]
    const last = numbers[numbers.length - 1]

    const number = first + last

    sum += Number(number)
  }
  return sum
})

puzzle.run()
