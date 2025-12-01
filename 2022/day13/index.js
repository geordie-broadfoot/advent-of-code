import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle("Day 13, 2022")

const dividerPackets = [[[2]], [[6]]]

let logging = false

const log = (...m) => logging && console.log(...m)

const parseSignal = (signal) => {
  signal = Array.from(signal.slice(1, signal.length - 1))
  //console.log(signal);
  let result = []
  let parents = [result]
  let targetElement = result
  while (signal.length) {
    let ch = signal.shift()

    if (signal.length && ch.match(/\d/) && signal[0].match(/\d/))
      ch += signal.shift()

    if (ch.match(/\d+/)) {
      log("trying to parse", ch)
      targetElement.push(parseInt(ch))
    }
    if (ch.match(/\[/)) {
      let arr = []
      targetElement.push(arr)
      parents.push(targetElement)
      log("new array: depth ", parents.length)
      targetElement = arr
    }
    if (ch.match(/\]/)) {
      targetElement = parents.pop()
    }
  }

  return result
}

const parseInput = (input) => {
  let signals = input.split("\n\n").map((s) => s.split("\n"))
  let output = []
  for (let pair of signals) {
    // console.log('Signal 1:');
    // console.log('   1:  ', parseSignal(pair[0]));
    // console.log('   2:  ', parseSignal(pair[1]));
    output.push([parseSignal(pair[0]), parseSignal(pair[1])])
  }
  return output
}

const toStr = (arr = "") => {
  if (!Array.isArray(arr)) return arr ?? "undefined"
  let msg = "["

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      msg += toStr(arr[i])
    } else msg += arr[i]
    if (i < arr.length - 1) msg += ", "
  }
  msg += "]"
  return msg
}

const compare = (s1, s2) => {
  while (true) {
    let ch1 = s1.shift()
    let ch2 = s2.shift()
    log(
      "\ncomparing element:\n    ",
      ch1 ? toStr(ch1) : ch1,
      "\nto\n    ",
      ch2 ? toStr(ch2) : ch2,
      "\n"
    )
    // for (let i = 0; i < 1000000000; i++);
    let result = null

    if (ch1 == null && ch2 == null) {
      log("  > equal length - jumping out")
      return null
    } else if (ch1 != null && ch2 == null) {
      log("  > right is out first")
      result = false
    } else if (ch1 == null && ch2 != null) {
      log("  > left is out first")
      result = true
    } else if (Array.isArray(ch1) && !Array.isArray(ch2)) {
      log("  > only left is an array")
      result = compare(ch1, [ch2])
    } else if (!Array.isArray(ch1) && Array.isArray(ch2)) {
      log("  > only right is an array")
      result = compare([ch1], ch2)
    } else if (Array.isArray(ch1) && Array.isArray(ch2)) {
      log("  > both elements are arrays")
      result = compare(ch1, ch2)
    } else if (ch1 > ch2) {
      log("  > right is smaller")
      result = false
    } else if (ch1 < ch2) {
      log("  > left is smaller")
      result = true
    }

    if (result != null) {
      log("returning ", result)
      return result
    }
  }
}

const clone = (arr) => {
  let cln = []

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      cln.push(clone(arr[i]))
    } else cln.push(arr[i])
  }
  return cln
}

const keypress = async () => {
  process.stdin.setRawMode(true)
  return new Promise((resolve) =>
    process.stdin.once("data", () => {
      process.stdin.setRawMode(false)
      resolve()
    })
  )
}

let expectedTestDataResult = [
  true,
  true,
  false,
  true,
  false,
  true,
  false,
  false,
]

const findGoodSignals = (signals) => {
  log("comparing", signals.length, "signals")
  let d = signals.length
  let goodIndexes = []
  for (let i = 0; i < d; i++) {
    // i = 2;

    let s1 = clone(signals[i][0])
    let s2 = clone(signals[i][1])
    log("\ncomparing signals:\n    ", toStr(s1), "\nto\n    ", toStr(s2))
    let res = compare(s1, s2)

    res && goodIndexes.push(i + 1)
    logging && keypress()
  }
  return goodIndexes
}

puzzle.setPart1((rawInput) => {
  const signals = parseInput(rawInput)
  // Part 1
  let output = findGoodSignals(signals)

  return output.reduce((acc, i) => acc + i, 0)
})

puzzle.setPart2((rawInput) => {
  let signals = parseInput(rawInput)
  signals = signals.reduce((acc, i) => {
    acc.push(i[0])
    acc.push(i[1])
    return acc
  }, [])
  signals.push(...dividerPackets)

  signals = signals.sort((a, b) => {
    if (compare(clone(a), clone(b))) return -1
    else return 1
  })

  let score = signals.reduce((acc, i, index) => {
    if (i == dividerPackets[0] || i == dividerPackets[1]) {
      acc *= index + 1
    }
    return acc
  }, 1)

  return score
})

puzzle.run()
