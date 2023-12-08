import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle("Day 3, 2023")

// Converts input str into a 2d array
const parseInput = (inputStr) => {
  let output = []

  inputStr.split("\n").forEach((line, i) => {
    output[i] = line.split("")
  })

  return output
}

const getSurroundings = (input, pos, number) => {
  const surroundings = []
  for (let y = pos.y - 1; y <= pos.y + 1; y++) {
    let row = ""
    for (let x = pos.x - 1; x <= pos.x + number.length; x++) {
      if (x < 0 || y < 0) row += "X"
      else if (y > input.length - 1 || x > input[0].length - 1) row += "X"
      else row += input[y][x]
    }
    surroundings.push(row)
  }
  return surroundings
}

// Return a list of numbers and start coords
const findAllNumbers = (input) => {
  const numbers = []
  let currentNumber = ""
  let numberPos = { x: 0, y: 0 }

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      // Loop over input array and find whole numbers

      if (input[y][x].match(/[0-9]/)) {
        if (currentNumber === "") {
          // Start of new number
          currentNumber += input[y][x]
          numberPos = { y, x }
        } else {
          // Continuing number
          currentNumber += input[y][x]
        }
      } else {
        // End of number
        if (currentNumber !== "") {
          // Build a snapshot of the surroundings
          // Store in result array
          numbers.push({
            value: Number(currentNumber),
            pos: { ...numberPos },
            area: getSurroundings(input, numberPos, currentNumber),
          })
          currentNumber = ""
        }
      }
    }
    if (currentNumber !== "") {
      numbers.push({
        value: Number(currentNumber),
        pos: { ...numberPos },
        area: getSurroundings(input, numberPos, currentNumber),
      })
    }
    // Clean up var between rows
    currentNumber = ""
  }

  return numbers
}

puzzle.setPart1((rawInput) => {
  let sum = 0
  const input = parseInput(rawInput)

  const numbers = findAllNumbers(input)
  numbers.forEach((number) => {
    let msg = ""

    let partNumber = false
    number.area.forEach((row) => {
      const strippedRow = row.replaceAll(/[0-9\.X]/g, "")
      msg += "\t" + row + "\n"

      if (strippedRow.length > 0) partNumber = true
    })
    if (partNumber) {
      sum += number.value
    }

    msg = msg.slice(0, -1) + "\t" + (partNumber ? "Y" : "N") + "\n\n"
  })

  return sum
})

// Start from any digit and determine what the whole number is
const getNumber = (input, pos) => {
  let output = input[pos.y][pos.x]
  //console.log(`Getting number at (${pos.x}, ${pos.y}) : '${output}'`)
  if (!output.match(/\d/)) {
    console.log("get number received invalid pos:", pos, "with data", output)
    return -1
  }

  let left = true
  let numberPos = { ...pos }
  let p = { ...pos }

  while (left) {
    p.x -= 1

    if (p.x < 0) {
      left = false
      numberPos.x = 0
    } else if (input[p.y][p.x].match(/[0-9]/)) {
      numberPos.x = p.x
      output = input[p.y][p.x] + output
    } else {
      left = false
    }
  }

  let right = true
  p = { ...pos }

  while (right) {
    p.x += 1

    if (p.x > input[0].length - 1) {
      right = false
    } else if (input[p.y][p.x].match(/[0-9]/)) {
      output += input[p.y][p.x]
    } else {
      right = false
    }
  }

  return {
    pos: numberPos,
    value: output,
  }
}

const mapGear = (input, pos) => {
  let gear = {
    pos,
    valid: false,
    neighbours: [],
  }

  if (input[pos.y][pos.x] !== "*") {
    //console.log("invalid pos for gear")
    return gear
  }
  // Find neighbouring numbers
  let neighbours = []
  for (let y = pos.y - 1; y <= pos.y + 1; y++) {
    for (let x = pos.x - 1; x <= pos.x + 1; x++) {
      if (input[y][x].match(/\d/)) neighbours.push(getNumber(input, { x, y }))
    }
  }
  //console.log("neighbours found:\n", neighbours)
  neighbours = neighbours.reduce((acc, num) => {
    let isNew = true
    for (let v of acc) {
      if (v.pos.x === num.pos.x && v.pos.y === num.pos.y) isNew = false
    }

    if (isNew) acc.push(num)
    return acc
  }, [])

  gear.neighbours = neighbours

  if (neighbours.length == 2) gear.valid = true

  return gear
}

const findAllGears = (input) => {
  let gears = []
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (input[y][x] === "*") {
        // Found Possible gear
        gears.push(mapGear(input, { y, x }))
      }
    }
  }

  gears = gears.filter((g) => g.valid)

  return gears
}

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput)
  const gears = findAllGears(input)
  let sum = 0

  for (let gear of gears) {
    let num1 = Number(gear.neighbours[0].value)
    let num2 = Number(gear.neighbours[1].value)

    sum += num1 * num2
  }

  return sum
})

puzzle.run()
