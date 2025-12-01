import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle(import.meta.url)

const parseInput = (input) => {
  let modules = input.split("\n").map((row) => {
    const [def, dests] = row.split(" -> ")

    let m = {}

    let name = def
    let type = "unknown"

    if (name[0] === "%") {
      name = name.slice(1, name.length)
      type = "ff"
    } else if (name[0] === "&") {
      name = name.slice(1, name.length)
      type = "cj"
    } else if (name === "broadcaster") type = "broadcaster"

    m.name = name
    m.type = type
    m.dests = dests.split(", ")

    return m
  })

  // Iterate over all cunjunction modules and map their input modules
  modules
    .filter((m) => m.type === "cj")
    .forEach((m) => {
      m.memory = modules
        .filter((mod) => mod.dests.includes(m.name))
        .map((mod) => mod.name)
        .reduce((acc, mod) => {
          acc[mod] = "low"
          return acc
        }, {})
    })

  // Turn into dict with name as key
  return modules.reduce((obj, m) => {
    obj[m.name] = m
    return obj
  }, {})
}

const handleBroadcaster = (module, pulse) => {
  return module.dests.map((d) => ({
    name: d,
    from: module.name,
    value: pulse.value,
  }))
}

const handleFlipFlop = (module, pulse) => {
  if (pulse.value === "high") return []

  // low pulse received -- toggle state
  module.state = module.state === "on" ? "off" : "on"

  // Generate pulses to destination modules
  return module.dests.map((d) => {
    return {
      name: d,
      from: module.name,
      value: module.state === "on" ? "high" : "low",
    }
  })
}

const handleConjuction = (module, pulse) => {
  // Record pulse
  module.memory[pulse.from] = pulse.value

  let response = "high"
  //console.log(module.name, module.memory)
  if (Object.values(module.memory).every((val) => val === "high")) {
    response = "low"
  }

  return module.dests.map((d) => {
    return {
      name: d,
      from: module.name,
      value: response,
    }
  })
}

const pressButton = (modules) => {
  const pulseCount = {
    low: 0,
    high: 0,
    rx: 0,
  }

  const pulses = [
    {
      name: "broadcaster",
      from: "button",
      value: "low",
    },
  ]

  while (pulses.length > 0) {
    const pulse = pulses.shift()

    pulseCount[pulse.value]++

    // console.log(
    //   `Handling pulse:  (${pulse.from}) -> (${pulse.name}) - ${pulse.value}`
    // )

    const destModule = modules[pulse.name]

    switch (destModule?.type) {
      case "ff":
        pulses.push(...handleFlipFlop(destModule, pulse))
        break
      case "cj":
        pulses.push(...handleConjuction(destModule, pulse))
        break
      case "broadcaster":
        pulses.push(...handleBroadcaster(destModule, pulse))
    }

    // Part 2 - Check for rx
    if (pulse.name === "rx" && pulse.value === "low") {
      pulseCount.rx++
    }
  }

  return pulseCount
}

puzzle.setPart1((rawInput) => {
  const input = parseInput(rawInput)

  let output = { high: 0, low: 0 }
  for (let i = 0; i < 1000; i++) {
    let result = pressButton(input)

    output.high += result.high
    output.low += result.low
  }

  console.log(output)

  return output.low * output.high
})

puzzle.setPart2((rawInput) => {
  const input = parseInput(rawInput)

  let presses = 0
  let finished = false

  while (!finished) {
    if (presses % 10000000 === 0) console.log("Processing....")

    presses++
    let result = pressButton(input)

    if (result.rx === 1) finished = true
  }

  return presses
})

puzzle.run()
