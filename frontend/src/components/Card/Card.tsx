import { Card as ICard } from '../../models/card.model'
import styles from './Card.module.css'

interface Props {
  data: ICard
}

export const Card = ({ data: { color, content, type } }: Props) => {
  const isHidden = type === 'H'

  return (
    <div className={`${styles.container} ${styles[color]}`}>
      <div className={`${styles.bg} ${isHidden && styles.hide}`}>
        <span className={`${styles.text} ${isHidden && styles.onu}`}>
          {content === 'Change'
            ? 'Color'
            : content === 'Draw 2'
            ? '+2'
            : content === 'Draw4 & Change'
            ? '+4'
            : content === 'Reverse'
            ? 'Rev'
            : content}
        </span>
      </div>
    </div>
  )
}
