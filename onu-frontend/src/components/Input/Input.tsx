import { InputHTMLAttributes } from 'react'
import styles from './Input.module.css'

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ ...props }: Props) => {
  return <input className={styles.box} {...props} />
}
