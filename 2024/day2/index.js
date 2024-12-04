import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle("Day 1, 2023")

const parseInput = (input) => {
  return input.split("\n").map((row) => {
    return row.split(" ").map(Number)
  })
}

const toDeltas = (sequence) => {
  let deltas = []
  for (let i = 0; i < sequence.length - 1; i++)
    deltas.push(sequence[i + 1] - sequence[i])

  return deltas
}

const isSeqSafe = (seq) => {
  const ds = toDeltas(seq)
  return ds.every((n) => n > 0 && n <= 3) || ds.every((n) => n < 0 && n >= -3)
}

const findSafeCount = (list) =>
  list.reduce((safe, seq) => (isSeqSafe(seq) ? safe + 1 : safe), 0)

puzzle.setPart1((rawInput) => {
  const input = parseInput(rawInput)

  const safe = findSafeCount(input)

  // return answer
  return safe
})

const checkEachDigit = (row) => {
  let isValid = false

  for (let i = 0; i < row.length; i++) {
    const newRow = [...row]
  }

  return isValid
}

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput)
  const safeCount = input.reduce((safe, seq) => {
    let isValid = false

    for (let i = 0; i < seq.length; i++) {
      // Copy the sequence and remove the digit in this pos
      let newSeq = [...seq]
      newSeq.splice(i, 1)

      if (isSeqSafe(newSeq)) isValid = true
    }

    if (isValid) return safe + 1
    return safe
  }, 0)

  return safeCount
})

puzzle.run()
