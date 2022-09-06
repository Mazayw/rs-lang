import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from '../styles.module.scss'

const backUrl = '/sprint'

export function ButtonRepeatSprint({part}: {part: React.Dispatch<React.SetStateAction<number>>}) {
  const click = () => {
    part(1)
  }

  return (
    <>
      <NavLink to={backUrl}>
        <button className={`button ${styles['button_close-game']}`} onClick={click}>
          Repeat
        </button>
      </NavLink>
    </>
  )
}
