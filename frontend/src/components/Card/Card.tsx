import { Card as ICard } from '../../models/card.model'
import styles from './Card.module.css'

interface Props {
  data: ICard
  canHover?: boolean
}

export const Card = ({
  data: { color, content, type },
  canHover = false,
}: Props) => {
  const isShown = type !== 'H'
  const cardStyles = `${styles.card} ${styles[color]} ${
    canHover && styles.hoverable
  }`

  return (
    <div className={cardStyles}>
      <span className={styles.top}>{isShown && content}</span>
      <span className={styles.mid}>{content}</span>
      <span className={styles.bot}>{isShown && content}</span>
    </div>
  )
}
