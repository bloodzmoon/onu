/**
 * Generate the deck and shuffle
 * ALL card of total 108
 */
const generateDeck = () => {
  const deck: any[] = []
  const colors = ['red', 'green', 'yellow', 'blue']

  // Generate Number Card
  colors.forEach((c) => {
    for (let i = 0; i < 10; i++) {
      const card = { type: 'N', content: `${i}`, color: c }
      deck.push(card)
      if (i !== 0) deck.push(card)
    }
  })

  // Generate Acion Card
  colors.forEach((c) => {
    const actions = ['+2', 'Rev', 'Skip']
    actions.forEach((a) => {
      const card = { type: 'A', content: a, color: c }
      deck.push(card)
      deck.push(card)
    })
  })

  // Generate Wild Card
  const wilds = ['Color', '+4']
  wilds.forEach((w) => {
    const card = { type: 'W', content: w, color: 'black' }
    for (let i = 0; i < 4; i++) deck.push(card)
  })

  return shuffle(deck)
}

/**
 * Shuffle array with the Fisher–Yates algorithm
 * copy this from internet...and it just work!
 */
const shuffle = (array: any[]) => {
  let m = array.length,
    t,
    i
  while (m) {
    i = Math.floor(Math.random() * m--)
    t = array[m]
    array[m] = array[i]
    array[i] = t
  }
  return array
}

export default {
  generateDeck,
  shuffle,
}
