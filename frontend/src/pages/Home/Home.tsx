import { HomeDialog } from '../../components'
import styles from './Home.module.css'

/**
 * This is the root route `/`
 * Player will have to enter their name
 * and GameID to proceed to the Game page
 */
export const Home = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>ONU!</header>
      <HomeDialog.Name />
      <HomeDialog.GameId />
    </div>
  )
}
