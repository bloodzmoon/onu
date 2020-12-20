/**
 * ==== Rules ====
 * (Number Card) 0-9 card each have double except 0
 * have 4 color red, blue, yellow, green
 * 19 x 4 => 76 cards
 *
 * (Action Card) There are 2 of each card in each color
 * have Draw 2, Reverse, Skip and have 4 color
 * 3 x 2 x 4 => 24 cards
 *
 * (Wild Card) Change color, Draw 4 & Change color
 * each have 4 card
 * 2 x 4 => 8 cards
 */
interface NumberCard {
  type: 'N'
  content: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
  color: 'Red' | 'Green' | 'Yellow' | 'Blue'
}

interface ActionCard {
  type: 'A'
  content: 'Draw 2' | 'Reverse' | 'Skip'
  color: 'Red' | 'Green' | 'Yellow' | 'Blue'
}

interface WildCard {
  type: 'W'
  content: 'Change' | 'Draw4 & Change'
}

export type Card = NumberCard | ActionCard | WildCard

/**
 * Generate the deck sequentially
 * includes ALL card of total 108
 */
export const generateDeck = () => {
  const deck: any[] = []
  const colors = ['Red', 'Green', 'Yellow', 'Blue']

  // Generate Number Card
  colors.forEach((c) => {
    for (let i = 0; i < 10; i++) {
      deck.push({ type: 'N', content: `${i}`, color: c })
      if (i !== 0) deck.push({ type: 'N', content: `${i}`, color: c })
    }
  })

  // Generate Acion Card
  colors.forEach((c) => {
    const actions = ['Draw 2', 'Reverse', 'Skip']
    actions.forEach((a) => {
      deck.push({ type: 'A', content: a, color: c })
      deck.push({ type: 'A', content: a, color: c })
    })
  })

  // Generate Wild Card
  const wilds = ['Change', 'Draw4 & Change']
  wilds.forEach((w) => {
    for (let i = 0; i < 4; i++) deck.push({ type: 'W', content: w })
  })

  return deck
}

/**
 * Shuffle array with the Fisher–Yates algorithm
 * copy this from internet...
 */
export const shuffle = (array: any[]) => {
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
