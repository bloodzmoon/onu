import styles from './Loader.module.css'

interface Props {
  text: string
}

/**
 * Just full screen overlay with some text
 */
export const Loader = ({ text }: Props) => {
  return <div className={styles.loader}>{text}</div>
}
