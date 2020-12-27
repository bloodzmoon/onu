import { useGlobalState } from '../../hooks'
import { Card } from '../Card/Card'
import { Card as ICard } from '../../models/card'
import styles from './Player.module.css'

interface Props {
  player: {
    id: number
    name: string
    cardCount: number
  }
  position: number
  myCards?: ICard[] | null
}

export const Player = ({ player, position, myCards }: Props) => {
  const global = useGlobalState()

  return (
    <div className={`${styles.player} ${styles[`p${position}`]}`}>
      {myCards ? (
        <>
          <span className={styles.name}>{global.myName}</span>
          {myCards.map((c, i) => (
            <Card
              key={`${c.type + c.color + c.content}${i}`}
              data={c}
              canHover
            />
          ))}
        </>
      ) : (
        <>
          <span className={styles.name}>{player.name}</span>
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
