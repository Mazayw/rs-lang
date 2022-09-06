import React from 'react'
import styles from '../styles.module.scss'

const levels = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2']
const colors = ['green', 'yellow', 'blue', 'lightgreen', 'red', 'orange']

export function SptintSelectList({sprintLevel}: {sprintLevel: React.Dispatch<React.SetStateAction<number>>}) {
  const listItems = levels.map((number, index) => (
    <li key={`level-${number.toString()}`} className={styles['sprint__item']} style={{ backgroundColor: `${colors[index]}`, color: `${colors[index - 1]}`}} onClick={ () => sprintLevel(index)}>
      {number}
    </li>
  ))

  return <ul className={styles['sprint__items']}>{listItems}</ul>
}
