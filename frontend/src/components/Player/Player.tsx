import { useGlobalState } from '../../hooks'
import { Card as ICard } from '../../models/card'
import { Card } from '../Card/Card'
import styles from './Player.module.css'

interface Props {
  player: {
    id: number
    name: string
    cardCount: number
  }
  position: number
  myCards?: ICard[] | null
  disabled?: boolean
}

export const Player = ({ player, position, myCards, disabled }: Props) => {
  const global = useGlobalState()
  const playerStyles = `${styles.player} ${styles[`p${position}`]} ${
    disabled && styles.disabled
  }`
  const nameStyles = `${styles.name} ${!disabled && styles.playing}`

  return (
    <div className={playerStyles}>
      {myCards ? (
        // My Cards
        <>
          <span className={nameStyles}>{global.myName}</span>
          {myCards.map((c, i) => (
            <Card
              key={`${c.type + c.color + c.content}${i}`}
              data={c}
              canHover
            />
          ))}
        </>
      ) : (
        // Other player cards
        <>
          <span className={nameStyles}>{player.name}</span>
          {Array(player.cardCount)
            .fill('')
            .map((_, i) => (
              <Card
                key={`${player.id}H${i}`}
                data={{ type: 'H', color: 'black', content: 'ONU' }}
              />
            ))}
        </>
      )}
    </div>
  )
}
