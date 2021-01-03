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
  color: Color
}

interface ActionCard {
  type: 'A'
  content: '+2' | 'Rev' | 'Skip'
  color: Color
}

interface WildCard {
  type: 'W'
  content: 'Color' | '+4'
  color: Color
}

interface HideCard {
  type: 'H'
  content: 'ONU'
  color: Color
}

type Color = 'black' | 'red' | 'green' | 'yellow' | 'blue'

export type Card = NumberCard | ActionCard | WildCard | HideCard
