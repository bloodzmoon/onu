import React from 'react'
import styles from './Loader.module.css'

interface Props {
  text?: string
  subtext?: string
}

/**
 * Just full screen overlay with some text
 */
export const Loader = React.memo(({ text, subtext }: Props) => {
  return (
    <div className={styles.loader}>
      {text}
      <span className={styles.subtext}>{subtext}</span>
    </div>
  )
})
