import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle(import.meta.url)
// lose, draw, win
const outcomes = [
  [3, 6, 0], // opp 1 (rock)
  [0, 3, 6], // opp 2 (paper)
  [6, 0, 3], // opp 3 (scissors)
]

// lose, draw, win
const shapes = [
  [3, 1, 2], // opp 1 (rock)
  [1, 2, 3], // opp 2 (paper)
  [2, 3, 1], // opp 3 (scissors)
]

const shapeScore = (shape) => {
  if (shape == "X" || shape == "A") return 1
  if (shape == "Y" || shape == "B") return 2
  if (shape == "Z" || shape == "C") return 3
}

const gameScore = (them, me) => outcomes[them - 1][me - 1]
const getShape = (outcome, them) => shapes[them - 1][outcome - 1]

const parseInput = (input) => {
  return input.split("\n").map((row) => {
    return {
      them: row.split(" ")[0],
      me: row.split(" ")[1],
    }
  })
}

puzzle.setPart1((input) => {
  let score = parseInput(input).reduce((total, round) => {
    let me = shapeScore(round.me)
    let them = shapeScore(round.them)
    let game = gameScore(them, me)

    return total + game + me
  }, 0)

  return score
})

puzzle.setPart2((input) => {
  let score = parseInput(input).reduce((total, round, i) => {
    let outcome = shapeScore(round.me)
    let them = shapeScore(round.them)
    let me = getShape(outcome, them)
    let game = gameScore(them, me)
    //console.log(`Round ${i}: ${them} v ${me} - Result ${game}`);
    return total + game + me
  }, 0)

  return score
})

puzzle.run()
