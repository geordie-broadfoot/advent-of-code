import { Puzzle } from "../../utils/puzzle.cjs"
const puzzle = new Puzzle(import.meta.url)

const newRope = (len = 2) => {
  let rope = []
  for (let i = 0; i < len; i++) {
    rope.push({ x: 0, y: 0 })
  }
  return rope
}

const getUniquePositions = (input = []) => {
  return input.reduce((acc, i) => {
    if (acc.filter((a) => a.x == i.x && a.y == i.y).length == 0) acc.push(i)
    return acc
  }, [])
}

const getDir = (dir) => {
  switch (dir) {
    case "U":
      return { x: 0, y: -1 }
    case "D":
      return { x: 0, y: 1 }
    case "R":
      return { x: 1, y: 0 }
    case "L":
      return { x: -1, y: 0 }
  }
}

const isAdjacent = (p1, p2) => {
  for (let y = p1.y - 1; y <= p1.y + 1; y++) {
    for (let x = p1.x - 1; x <= p1.x + 1; x++) {
      if (x == p2.x && y == p2.y) return true
    }
  }
  return false
}

const moveNode = (nd, dir) => {
  nd.x += dir.x
  nd.y += dir.y
  return nd
}

const moveTail = (head, tail) => {
  if (isAdjacent(head, tail)) {
    //console.log('tail is adjacent to head');
    return
  }

  let diff = { x: head.x - tail.x, y: head.y - tail.y }
  //console.log(' .   diff', diff);
  // Move sideways
  if (Math.abs(diff.x) == 2) {
    // Move diagonal
    if (diff.y != 0) {
      tail.x += diff.x > 0 ? 1 : -1
      tail.y += diff.y > 0 ? 1 : -1
    } else {
      tail.x += diff.x > 0 ? 1 : -1
    }
  }
  // Move vertical
  else if (Math.abs(diff.y) == 2) {
    //diag
    if (diff.x != 0) {
      tail.y += diff.y > 0 ? 1 : -1
      tail.x += diff.x > 0 ? 1 : -1
    } else {
      tail.y += diff.y > 0 ? 1 : -1
    }
  }
}

const printRopeState = (rope = [], hist = []) => {
  let bounds = hist.reduce(
    (acc, n) => {
      if (n[0].x < acc.x.min) acc.x.min = n[0].x
      if (n[0].x > acc.x.max) acc.x.max = n[0].x
      if (n[0].y < acc.y.min) acc.y.min = n[0].y
      if (n[0].y > acc.y.max) acc.y.max = n[0].y
      return acc
    },
    {
      x: { min: 100, max: -100 },
      y: { min: 100, max: -100 },
    }
  )

  // let bounds = {
  //     x: { min: rope[0].x - 20, max: rope[0].x + 20 },
  //     y: { min: rope[0].y - 20, max: rope[0].y + 20 }
  // };

  let tailPositions = hist.map((h) => {
    return h[h.length - 1]
  })
  let msg = ""
  for (let y = bounds.y.min; y <= bounds.y.max; y++) {
    for (let x = bounds.x.min; x <= bounds.x.max; x++) {
      let index = getUniquePositions(rope).findIndex(
        (r) => r.x == x && r.y == y
      )
      if (index == -1) {
        if (tailPositions.filter((t) => t.x == x && t.y == y).length > 0)
          msg += " "
        else msg += "."
      } else msg += index == 0 ? "H" : index
    }
    msg += "\n"
  }
  console.log(msg)
}

const simulateRope = (cmds, rope) => {
  let hist = []
  for (let n = 0; n < cmds.length; n++) {
    let cmd = cmds[n]
    //      console.log('moving', cmd.amount, 'spaces', cmd.dir);
    for (let i = 0; i < cmd.amount; i++) {
      let state = []
      for (let r = 0; r < rope.length; r++) {
        if (r == 0) rope[r] = moveNode(rope[r], getDir(cmd.dir))
        else moveTail(rope[r - 1], rope[r])
        //console.log(rope[r]);
        state.push({ ...rope[r] })
      }
      //printRopeState([...rope], [...hist])
      //for (let p = 0; p < 100000000; p++);
      //console.clear()
      hist.push(state)
    }
  }
  return hist
}

const parseInput = (input) => {
  return input.split("\n").map((r) => {
    let [dir, amt] = r.split(" ")
    return { amount: amt, dir }
  })
}

const printRopeHistory = (hist = []) => {
  let bounds = hist.reduce(
    (acc, n) => {
      if (n[0].x < acc.x.min) acc.x.min = n[0].x
      if (n[0].x > acc.x.max) acc.x.max = n[0].x
      if (n[0].y < acc.y.min) acc.y.min = n[0].y
      if (n[0].y > acc.y.max) acc.y.max = n[0].y
      return acc
    },
    {
      x: { min: 100, max: -100 },
      y: { min: 100, max: -100 },
    }
  )

  let tailPositions = hist.map((h) => {
    return h[h.length - 1]
  })

  for (let y = bounds.y.min; y <= bounds.y.max; y++) {
    let msg = ""
    for (let x = bounds.x.min; x <= bounds.x.max; x++) {
      let pos = { x, y }
      //console.log('considering', pos);
      if (tailPositions.filter((t) => t.x == x && t.y == y).length > 0) {
        msg += "#"
      } else msg += "."
    }
    console.log(msg)
  }
}

puzzle.setPart1((rawinput) => {
  let cmds = parseInput(rawinput)

  let output = simulateRope(cmds, newRope(2))

  //printRopeHistory(output)

  return getUniquePositions(
    output.map((o) => {
      return o[o.length - 1]
    })
  ).length
})

puzzle.setPart2((rawinput) => {
  let cmds = parseInput(rawinput)

  let output = simulateRope(cmds, newRope(10))

  //printRopeHistory(output)

  return getUniquePositions(
    output.map((o) => {
      return o[o.length - 1]
    })
  ).length
})

puzzle.run()
