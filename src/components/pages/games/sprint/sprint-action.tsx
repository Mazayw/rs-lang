import React, { useState } from 'react'
import { base } from '../../../settings'
import { ButtonsSprintAction } from './sprint-components/buttons-sprint-action'
import { SprintInRow } from './sprint-components/sprint-in-row'
import { getWordSprint, getWordsSprint, saveSatatisticsSprint, sprintDisplayWord } from './sprint-services/sprint-services'
import styles from './styles.module.scss'

interface IPropsSprintAction {
  audio: boolean
  displayScore: React.Dispatch<React.SetStateAction<number>>
  partEnd: React.Dispatch<React.SetStateAction<boolean>>
}
const url = base

export function SprintAction(props: IPropsSprintAction) {
  const [answerButton, setButton] = useState(-1)
  const [visual, setVisual] = useState(-1)
  const [countRight, setCountRight] = useState(0)
  const [displayScoreAdd, setDisplayScoreAdd] = useState(10)
  const [displayScore, setDisplayScore] = useState(0)

  const playAudio = (state: boolean) => {
    const audio = new Audio(`${url}/${sprintDisplayWord.word.audio}`)
    if (state) {
      audio.play()
    }
  }

  const initAnswer = (checkAnswer: number) => {
    if (!!checkAnswer == sprintDisplayWord.answer) {
      setVisual(1)
      setCountRight(countRight + 1)
      setDisplayScore(displayScore + displayScoreAdd)
      if (countRight > 2) {
        setCountRight(0)
        setDisplayScoreAdd(displayScoreAdd * 2)
      }
      saveSatatisticsSprint(true)
    } else {
      setVisual(0)
      setCountRight(0)
      setDisplayScoreAdd(10)
      saveSatatisticsSprint(false)
    }
    setTimeout(() => setVisual(-1), 200)
  }

  const checkAvailableWord = async () => {
    const checkAvailable = await getWordSprint()
    if (!checkAvailable) {
      props.partEnd(true)
    }
  }

  React.useEffect(() => {
    if (answerButton === 0 || answerButton === 1) {
      initAnswer(answerButton)
      setButton(-1)
      checkAvailableWord()
    } else {
      playAudio(props.audio)
    }
  }, [answerButton])

  React.useEffect(() => {
    props.displayScore(displayScore)
  }, [displayScore])

  return (
    <div className={styles['sprint__action']}>
      <h3 className={styles['sprint__action-current-result']}>Score: {displayScore}</h3>
      <div
        className={styles['sprint__action-card']}
        style={{
          boxShadow: `0 0 1em 0.8em ${
            visual === 1 ? 'green' : visual === 0 ? 'red' : 'transparent'
          }`
        }}
      >
        <div className={styles['sprint__action-progress']}>
        <SprintInRow displayScoreAdd={displayScoreAdd} countRight={countRight} />
        </div>
        <div className={styles['sprint__action-words-wrapper']}>
          <div className={styles['sprint__action-words-image']}></div>
          <img
            className={styles['sptint__action-image']}
            src={`${url}/${sprintDisplayWord.word.image}`}
            alt={sprintDisplayWord.word.word}
          />
          <div className={styles['sprint__action-words-word']}>{sprintDisplayWord.word.word}</div>
          <div className={styles['sprint__action-words-translate']}>
            {sprintDisplayWord.translate}
          </div>
        </div>
        <div className={styles['sprint__action-buttons']}>
          <ButtonsSprintAction buttonAnswer={setButton} />
        </div>
      </div>
    </div>
  )
}
