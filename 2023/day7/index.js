import { Puzzle } from "../../utils/puzzle.cjs"

const puzzle = new Puzzle(import.meta.url)

const handRanks = ["five", "four", "fh", "three", "2pair", "pair", "none"]

const parseInput = (ranks, input, pt2 = false) => {
  return input.split("\n").map((row) => {
    const hand = row.split(" ")[0]
    return {
      hand,
      bet: Number(row.split(" ")[1]),
      score: determineHand(ranks, hand, pt2),
    }
  })
}

const determineHand = (ranks, hand, pt2 = false) => {
  // Map the hand into #s of each card, descending
  const sets = hand.split("").reduce(
    (obj, card) => {
      if (obj[card] == undefined) obj[card] = 1
      else obj[card]++
      return obj
    },
    { J: 0 }
  )

  let jokerCount = pt2 ? sets.J : 0
  if (pt2) sets.J = 0
  // Iterate over the card/count pairs to determine the hand rank
  const result = Object.entries(sets)
    .sort((a, b) => {
      // Sort by quantity first
      if (b[1] !== a[1]) return b[1] - a[1]

      // Then card rank
      return ranks.indexOf(b[0]) - ranks.indexOf(a[0])
    })
    .reduce(
      (res, [card, count]) => {
        const jokers = jokerCount

        if (jokers > 0) jokerCount = 0

        if (res == null && count + jokers == 5)
          return {
            type: "five",
            card,
          }
        else if (res.type == null && count + jokers == 4)
          return { type: "four", card }
        else if (res.type == null && count + jokers == 3)
          return { type: "three", card }
        else if (res.type == "three" && count + jokers == 2)
          return { type: "fh", card: res.card + card }
        else if (res.type == null && count + jokers == 2)
          return { type: "pair", card }
        else if (res.type == "pair" && count + jokers == 2)
          return {
            type: "2pair",
            card:
              ranks.indexOf(res.card) < ranks.indexOf(card)
                ? res.card + card
                : card + res.card,
          }
        else if (res.type == null && count + jokers == 1)
          return { type: "none" }
        else return res
      },
      {
        type: null,
        card: "",
      }
    )

  return result
}

const sortHands = (ranks, hands) => {
  return hands.sort((h1, h2) => {
    let h1Rank = handRanks.indexOf(h1.score.type)
    let h2Rank = handRanks.indexOf(h2.score.type)

    // By rank first
    if (h1Rank !== h2Rank) return h2Rank - h1Rank

    // Then by order of cards in hand
    for (let i = 0; i < 5; i++) {
      if (h1.hand[i] != h2.hand[i]) {
        return ranks.indexOf(h2.hand[i]) - ranks.indexOf(h1.hand[i])
      }
    }
    return 0
  })
}

const addUpScores = (hands) => {
  return hands.reduce((sum, hand, i) => {
    const rank = i + 1
    const score = hand.bet * rank
    return sum + score
  }, 0)
}

puzzle.setPart1((rawinput) => {
  const cardRanks = [
    "A",
    "K",
    "Q",
    "J",
    "T",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
  ]
  const input = parseInput(cardRanks, rawinput)
  const sortedHands = sortHands(cardRanks, input)
  const output = addUpScores(sortedHands)

  return output
})

puzzle.setPart2((rawinput) => {
  const cardRanks = [
    "A",
    "K",
    "Q",
    "T",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
    "J",
  ]
  const input = parseInput(cardRanks, rawinput, true)

  const hands = sortHands(cardRanks, input)

  const output = addUpScores(hands)

  return output
})

puzzle.run()
