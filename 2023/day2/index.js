import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle(import.meta.url)

const defaultDraw = {
  red: 0,
  green: 0,
  blue: 0,
}

const upperLimit = {
  red: 12,
  green: 13,
  blue: 14,
}
let games = []

puzzle.setPart1((input) => {
  games = input.split("\n").map((row) => {
    const [name, stats] = row.split(":")

    const id = name.trim().split(" ")[1]

    const rounds = stats.split(";").map((set) => {
      const draws = set.split(",").reduce(
        (acc, d) => {
          //console.log(d);
          const [number, color] = d.trim().split(" ")
          acc[color.trim()] = Number(number)
          return acc
        },
        { ...defaultDraw }
      )

      return draws
    })
    return {
      id,
      rounds,
    }
  })

  const output = games.reduce((total, game) => {
    let isValid = true
    //console.log(`Considering game ${game.id}:\n${JSON.stringify(game.rounds)}`);
    game.rounds.forEach((round) => {
      if (
        round.red > upperLimit.red ||
        round.green > upperLimit.green ||
        round.blue > upperLimit.blue
      )
        isValid = false
    })

    if (isValid) {
      //console.log(`Game ${game.id} is valid`);
      total += Number(game.id)
    }
    return total
  }, 0)

  return output
})

puzzle.setPart2((input) => {
  let sum = 0
  games.forEach((game) => {
    const min = game.rounds.reduce(
      (acc, r) => {
        ;["red", "green", "blue"].forEach((c) => {
          if (acc[c] < r[c]) acc[c] = r[c]
        })

        return acc
      },
      { ...defaultDraw }
    )

    sum += min.red * min.green * min.blue
  })

  return sum
})

puzzle.run()
