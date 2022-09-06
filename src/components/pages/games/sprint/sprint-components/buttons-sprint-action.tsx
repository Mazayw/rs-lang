import React, { useEffect } from 'react'
import styles from '../styles.module.scss'

type TFunc = (this: void, event: KeyboardEvent) => void

export function ButtonsSprintAction({
  buttonAnswer,
}: {
  buttonAnswer: React.Dispatch<React.SetStateAction<number>>
}) {
  const [arrowLeft, setArrowLeft] = React.useState(false)
  const [arrowRight, setArrowRight] = React.useState(false)

  function useKeyArrow() {
    const onKeyArrowDown: TFunc = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          setArrowLeft(true)
          break
        case 'ArrowRight':
          setArrowRight(true)
          break
      }
    }
    const onKeyArrowUp: TFunc = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          setArrowLeft(false)
          clickTrue()
          break
        case 'ArrowRight':
          setArrowRight(false)
          clickTrue()
          break
      }
    }
    useEffect(() => {
      document.addEventListener('keydown', onKeyArrowDown)
      document.addEventListener('keyup', onKeyArrowUp)
      return () => {
        document.removeEventListener('keyup', onKeyArrowUp)
        document.removeEventListener('keydown', onKeyArrowDown)
      }
    }, [])
    return 0
  }
  useKeyArrow()

  const clickTrue = async () => {
    buttonAnswer(1)
  }
  const clickFalse = async () => {
    buttonAnswer(0)
  }

  return (
    <div className={styles['sprint__action-buttons']}>
      <button
        className={`button ${styles['button_sprint-false']}`}
        id={styles['button_sprint-false']}
        style={{ transform: arrowLeft ? 'scale(1.2)' : 'scale(1.0)' }}
        onClick={clickFalse}
      >&larr; False</button>
      <button
        className={`button ${styles['button_sprint-true']}`}
        style={{ transform: arrowRight ? 'scale(1.2)' : 'scale(1.0)' }}
        onClick={clickTrue}
      >True &rarr;</button>
    </div>
  )
}
