const testInput1 = `Time: 7 15 30
Distance: 9 40 200`

const expectedPt1 = 288

const expectedPt2 = 71503

const rawInput = `Time: 49 87 78 95
Distance: 356 1378 1502 1882`

const testing = process.argv[2]?.match("-t") || false

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

{
  console.log("Part 1")
  const input = parseInput(testing ? testInput1 : rawInput)

  const wins = input.map(findWinCount)

  //console.log("wins", wins)

  let output = wins.reduce((t, w) => t * w, 1)

  testing && console.log("Expected output: ", expectedPt1)
  console.log("Output: ", output)
}

{
  console.log("Part 2")
  const input = testing ? testInput1 : rawInput

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

  console.log(time, record)
  let output = findWinCount({ time, record })

  testing && console.log("Expected output: ", expectedPt2)
  console.log("Output: ", output)
}
