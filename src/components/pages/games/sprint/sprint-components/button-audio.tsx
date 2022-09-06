import React, { useState } from 'react'
import styles from '../styles.module.scss'

export function ButtonAudioState({
  setAudio,
}: {
  setAudio: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [sound, setSound] = useState(false)

  const click = () => {
    if (sound) {
      setSound(false)
      setAudio(false)
    } else {
      setSound(true)
      setAudio(true)
    }
  }

  return (
    <button className={styles['button_sprint-audio']} onClick={click}>
      <img
        className={styles['button_sprint-audio-image']}
        src={`./img/games/${sound ? 'volume-on.svg' : 'volume-off.svg'}`}
        alt={'sound on-off'}
      /></button>
  )
}
