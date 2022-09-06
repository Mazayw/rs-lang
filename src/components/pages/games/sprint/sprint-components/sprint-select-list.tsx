import React from 'react'
import styles from '../styles.module.scss'

const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
const colors = ['#812929', '#c85f0b', '#e7ab2c', '#248324', '#282886', '#7119a2']

export function SptintSelectList({sprintLevel}: {sprintLevel: React.Dispatch<React.SetStateAction<number>>}) {
  const listItems = levels.map((number, index) => (
    <li key={`level-${number.toString()}`} className={styles['sprint__item']} style={{ backgroundColor: `${colors[index]}`}} onClick={ () => sprintLevel(index)}>
      {number}
    </li>
  ))

  return <ul className={styles['sprint__items']}>{listItems}</ul>
}
