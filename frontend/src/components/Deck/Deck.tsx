import { FiRefreshCw, FiRefreshCcw } from 'react-icons/fi'
import styles from './Deck.module.css'

interface Props {
  direction: 'cw' | 'ccw'
}

export const Deck = ({ direction }: Props) => {
  const Direction = direction === 'cw' ? FiRefreshCw : FiRefreshCcw

  return (
    <div className={styles.container}>
      <Direction className={styles.direction} />
    </div>
  )
}
