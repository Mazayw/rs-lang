import React from 'react'
import { IPropsGameTimer } from '../../../types/sprint-interface'
import styles from './styles.module.scss'

export function GameTimer(props: IPropsGameTimer) {
  const timerInit = props.timeInit
  const [counter, setCounter] = React.useState(timerInit)
  const [progress, setCircle] = React.useState(251)

  const RADIUS = 40
  const CIRCLE_LENGTH = 2 * Math.PI * RADIUS
  const PROGRESS_SET = 100 / timerInit

  React.useEffect(() => {
    if (counter === 0) {
      props.partEnd(true)
    }
    if (counter > 0) {
      const timerID = setInterval(() => {
        const procent = (((counter - 1) * PROGRESS_SET) / 100) * CIRCLE_LENGTH
        setCounter(counter - 1)
        setCircle(procent)
      }, 1000)
      return () => clearInterval(timerID)
    }
  }, [counter, progress])

  return (
    <div className={styles['game__timer-start']}>
      <svg height='100' width='100'>
        <circle
          className={styles['timer-start__circle']}
          id='timer-start__circle'
          cx='50'
          cy='50'
          r={`${RADIUS}`}
          strokeWidth='6'
          strokeDashoffset={progress}
          strokeDasharray={`${CIRCLE_LENGTH} ${CIRCLE_LENGTH}`}
        />
        <text
          className={styles['timer-start__text']}
          fontSize='40px'
          x='50%'
          y='50%'
          dy='15px'
          textAnchor='middle'
        >
          {counter}
        </text>
      </svg>
    </div>
  )
}
