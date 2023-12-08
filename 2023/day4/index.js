import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle("Day 4, 2023")

const parseInput = (inputStr) => {
  return inputStr
    .replaceAll("  ", " ")
    .split("\n")
    .map((line) => {
      const id = line.split(":")[0].split(" ")[1]
      const data = line.split(":")[1].trim()

      const winningNumbers = data
        .split(" | ")[0]
        .trim()
        .split(" ")
        .map((n) => Number(n.trim()))
      const drawnNumbers = data
        .split(" | ")[1]
        .trim()
        .split(" ")
        .map((n) => Number(n.trim()))

      return {
        id,
        winners: winningNumbers,
        drawn: drawnNumbers,
        copies: 1,
      }
    })
}

puzzle.setPart1((rawInput) => {
  const input = parseInput(rawInput)

  let sum = 0

  for (let card of input) {
    //console.log("Checking card:", card)
    let value = 0

    for (let num of card.drawn) {
      if (card.winners.includes(num)) {
        if (value == 0) value = 1
        else value *= 2
        //  console.log(num, "is winner! value", value)
      }
    }

    sum += value
  }

  return sum
})

puzzle.setPart2((rawInput) => {
  const cards = parseInput(rawInput)

  for (let i = 0; i < cards.length; i++) {
    let winCt = cards[i].drawn.reduce((total, n) => {
      if (cards[i].winners.includes(n)) return total + 1
      return total
    }, 0)

    for (let x = 0; x < winCt; x++) {
      cards[i + x + 1].copies += cards[i].copies
    }
  }

  let total = cards.reduce((sum, c) => sum + c.copies, 0)
  return total
})

puzzle.run()
