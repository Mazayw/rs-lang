import React from 'react'
import { NavLink } from 'react-router-dom'
import { sprintAnswers } from '../sprint-services/sprint-services'
import styles from '../styles.module.scss'

const backUrl = '/sprint'

export function ButtonRepeatSprint({part}: {part: React.Dispatch<React.SetStateAction<number>>}) {
  const click = () => {
    part(1)
    sprintAnswers.length = 0
  }

  return (
    <>
      <NavLink to={backUrl}>
        <button className={`button ${styles['button_close-game']}`} onClick={click}>
          Повтор
        </button>
      </NavLink>
    </>
  )
}
