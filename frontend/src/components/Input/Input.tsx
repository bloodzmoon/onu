import React, { InputHTMLAttributes } from 'react'
import styles from './Input.module.css'

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  return <input ref={ref} className={styles.box} {...props} />
})
