import { Puzzle } from "../../utils/puzzle.cjs"

const puzzle = new Puzzle("Day 6, 2023")

const parseInput = (input) => {
  let i = input.split("\n")
  const times = i[0].split(" ").slice(1)
  const dists = i[1].split(" ").slice(1)

  const races = []

  for (let n = 0; n < times.length; n++) {
    races.push({
      time: Number(times[n]),
      record: Number(dists[n]),
    })
  }

  return races
}

const findWinCount = (game) => {
  let wins = 0

  for (let i = 0; i < game.time; i++) {
    const holdLength = i
    const remainingTime = game.time - holdLength

    const totalDistance = remainingTime * holdLength

    if (totalDistance > game.record) wins++
  }
  return wins
}

puzzle.setPart1((rawinput) => {
  const input = parseInput(rawinput)

  const wins = input.map(findWinCount)

  let output = wins.reduce((t, w) => t * w, 1)

  return output
})

puzzle.setPart2((input) => {
  const time = input
    .split("\n")[0]
    .split(" ")
    .slice(1)
    .reduce((a, n) => a + n, "")
  const record = input
    .split("\n")[1]
    .split(" ")
    .slice(1)
    .reduce((a, n) => a + n, "")

  let output = findWinCount({ time, record })
  return output
})

puzzle.run()
