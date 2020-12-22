import { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ children, ...props }: Props) => {
  return (
    <button className={styles.btn} {...props}>
      {children}
    </button>
  )
}
