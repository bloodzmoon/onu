import styles from './Loader.module.css'

interface Props {
  text?: string
  subtext?: string
}

/**
 * Just full screen overlay with some text
 */
export const Loader = ({ text, subtext }: Props) => {
  return (
    <div className={styles.loader}>
      {text}
      <span className={styles.subtext}>{subtext}</span>
    </div>
  )
}
