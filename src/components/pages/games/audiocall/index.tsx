import Description from './description'
import styles from './styles.module.scss'
import { useState, useEffect } from 'react'
import { IWord } from '../../../types/interface'
import AudioGameMain from './game/index'

function Audiocall() {
  const [gameState, setGameState] = useState(0)
  const words: IWord[] = []

  useEffect(() => {
    setGameState(0)
  }, [])

  return (
    <div className={styles['about-main']}>
      {gameState === 0 && <Description setGameState={setGameState} words={words} />}
      {gameState === 1 && <AudioGameMain setGameState={setGameState} words={words} />}
    </div>
  )
}
export default Audiocall
