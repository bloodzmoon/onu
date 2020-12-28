import { FiRefreshCw, FiRefreshCcw } from 'react-icons/fi'
import { Card } from '../Card/Card'
import { Card as ICard } from '../../models/card'
import styles from './Deck.module.css'

interface Props {
  lastestCard: ICard
  direction: 'cw' | 'ccw'
  disabled?: boolean
  drawCard: () => void
}

export const Deck = ({ lastestCard, direction, disabled, drawCard }: Props) => {
  const Direction = direction === 'cw' ? FiRefreshCw : FiRefreshCcw

  return (
    <div className={`${styles.container} ${disabled && styles.disabled}`}>
      <Direction className={styles.direction} />
      <div className={styles.deck}>
        <Card
          data={{ type: 'H', color: 'black', content: 'ONU' }}
          disabled={disabled}
          onClick={drawCard}
        />
      </div>
      <div className={styles.lastest}>
        <Card data={lastestCard} />
      </div>
    </div>
  )
}
