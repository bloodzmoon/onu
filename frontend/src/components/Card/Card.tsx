import React from 'react'
import { Card as ICard } from '@shared/card.model'
import styles from './Card.module.css'

interface Props {
  data: ICard | null
  canHover?: boolean
  disabled?: boolean
  onClick?: () => void
}

export const Card = React.memo(
  ({ data, canHover = false, disabled = false, onClick }: Props) => {
    if (!data) return <></>

    const { type, color, content } = data
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
)
