import Description from './description'
import styles from './styles.module.scss'
import { useState, useEffect } from 'react'
import { IWord } from '../../../types/interface'
import AudioGameMain from './game/index'
import { IAnswer } from '../../../types/audioGame-interface'
import GameResults from './results/index'

function Audiocall() {
  const [gameState, setGameState] = useState(0)
  const [words, setWords] = useState<Array<IWord | never>>([])
  const [answersArr, setAnswersArr] = useState<IAnswer[]>([])

  useEffect(() => {
    setGameState(0)
    setAnswersArr([])
  }, [])

  return (
    <div className={styles['about-main']}>
      {gameState === 0 && <Description setGameState={setGameState} setWords={setWords} />}
      {gameState === 1 && (
        <AudioGameMain setGameState={setGameState} words={words} setAnswersArr={setAnswersArr} />
      )}
      {gameState === 3 && <GameResults setGameState={setGameState} answersArr={answersArr} />}
    </div>
  )
}
export default Audiocall
