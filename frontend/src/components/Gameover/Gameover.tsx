import styles from './Gameover.module.css'

interface Props {
  result: string[]
}

export const Gameover = ({ result }: Props) => {
  return (
    <div className={styles.container}>
      Gameover
      <div className={styles.list}>
        {result.map((name, i) => (
          <div key={i}>{name}</div>
        ))}
      </div>
      <p className={styles.text}>Wanna play again? Press F5</p>
    </div>
  )
}
