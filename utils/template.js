const testInput1 = ``

const expectedPt1 = 0
const expectedPt2 = 0

const rawInput = ``

const testing = process.argv[2]?.match("-t") || false

const pt2 = process.argv[2]?.match("-p2") || false

const parseInput = (input) => {
  return input
}

{
  console.log("Part 1")

  const input = parseInput(testing ? testInput1 : rawInput)

  let output = 0

  testing && console.log("Expected output:", expectedPt1)
  console.log("Output:", output)
}

{
  if (pt2) {
    console.log("Part 2")

    const input = parseInput(testing ? testInput1 : rawInput)

    let output = 0

    testing && console.log("Expected output:", expectedPt2)
    console.log("Output:", output)
  }
}
