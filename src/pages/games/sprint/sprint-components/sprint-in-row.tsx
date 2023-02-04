import React, { useState } from 'react'
import styles from '../styles.module.scss'

interface IPropsSprintInRow {
  displayScoreAdd: number
  countRight: number
}

export function SprintInRow(props: IPropsSprintInRow) {
  const [visual, setVisual] = useState(-1)

  return (
    <div
      className={styles['sprint__row']}
      style={{ background: `${visual === 1 ? 'green' : visual === 0 ? 'red' : 'transparent'}` }}
    >
      <div className={styles['sprint__row-in']}>
        <div
          className={styles['sprint__row-row']}
          style={{ background: `${props.countRight >= 1 ? 'green' : 'transparent'}` }}
        ></div>
        <div
          className={styles['sprint__row-row']}
          style={{ background: `${props.countRight >= 2 ? 'green' : 'transparent'}` }}
        ></div>
        <div
          className={styles['sprint__row-row']}
          style={{ background: `${props.countRight >= 3 ? 'green' : 'transparent'}` }}
        ></div>
      </div>
      <div className={styles['sprint__row-score']}>+{props.displayScoreAdd}</div>
    </div>
  )
}
