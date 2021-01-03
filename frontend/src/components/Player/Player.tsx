import React from 'react'
import { useGlobalState } from 'Hooks'
import { Card } from '../Card/Card'
import { Card as ICard } from '@shared/card.model'
import { PlayerData } from '@shared/game.model'
import styles from './Player.module.css'

interface Props {
  player: PlayerData
  position: number
  myCards?: ICard[] | null
  disabled?: boolean
  playCard?: (card: ICard) => void
  isCardPlayable?: (card: ICard) => boolean
}

export const Player = React.memo(
  ({
    player,
    position,
    myCards,
    disabled,
    playCard,
    isCardPlayable,
  }: Props) => {
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
                onClick={playCard && (() => playCard(c))}
                disabled={isCardPlayable && !isCardPlayable(c)}
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
)
