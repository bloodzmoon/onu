import styles from './ColorPicker.module.css'

type Color = 'red' | 'green' | 'blue' | 'yellow'

interface Props {
  onSelect: (color: Color) => void
}

export const ColorPicker = ({ onSelect }: Props) => {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.color} ${styles.red}`}
        onClick={() => onSelect('red')}
      />
      <div
        className={`${styles.color} ${styles.green}`}
        onClick={() => onSelect('green')}
      />
      <div
        className={`${styles.color} ${styles.blue}`}
        onClick={() => onSelect('blue')}
      />
      <div
        className={`${styles.color} ${styles.yellow}`}
        onClick={() => onSelect('yellow')}
      />
    </div>
  )
}
