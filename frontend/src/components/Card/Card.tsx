import { Card as ICard } from '../../models/card'
import styles from './Card.module.css'

interface Props {
  data: ICard
  canHover?: boolean
  disabled?: boolean
  onClick?: () => void
}

export const Card = ({
  data: { color, content, type },
  canHover = false,
  disabled = false,
  onClick,
}: Props) => {
  const isShown = type !== 'H'
  const cardStyles = `${styles.card} ${styles[color]} ${
    canHover && styles.hoverable
  } ${disabled && styles.disabled}`

  return (
    <div className={cardStyles} onClick={onClick}>
      <span className={styles.top}>{isShown && content}</span>
      <span className={styles.mid}>{content}</span>
      <span className={styles.bot}>{isShown && content}</span>
    </div>
  )
}
