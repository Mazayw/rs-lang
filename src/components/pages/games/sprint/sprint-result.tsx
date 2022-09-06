import React from 'react'
import { ButtonCloseGame } from './sprint-components/button-close-game'
import { ButtonRepeatSprint } from './sprint-components/button-repeat-sprint'
import { dataResultSprint } from './sprint-data'
import { SprintResultWords } from './sprint-components/sprint-result-words'
import styles from './styles.module.scss'
import { sprintAnswers } from './sprint-services/sprint-services'

interface IPropsSprintResult {
  part: React.Dispatch<React.SetStateAction<number>>
  partEnded: React.Dispatch<React.SetStateAction<boolean>>
  displayScore: number
}

export function SprintResult(props: IPropsSprintResult) {
  const getResult = () => {
    const wordsRight = sprintAnswers.filter(({ answer }) => answer)
    const wordsWrong = sprintAnswers.filter(({ answer }) => !answer)
    dataResultSprint.learned.countWords = wordsRight.length
    dataResultSprint.unlearned.countWords = wordsWrong.length
    dataResultSprint.learned.words = wordsRight.reduce((acc, { word }) => {
      const key = `${word.word}`;
      return {
        ...acc,
        [key]: `${word.wordTranslate}`
      }
    }, {})
    dataResultSprint.unlearned.words = wordsWrong.reduce((acc, { word }) => {
      const key = `${word.word}`;
      return {
        ...acc,
        [key]: `${word.wordTranslate}`
      }
    }, {})
  }
  getResult()

  return (
    <div className={styles['sprint__result']}>
      <h3 className={styles['sprint__result-title']}>Result: {props.displayScore} point</h3>
      <div className={styles['sprint__result-buttons']}>
        <ButtonCloseGame part={props.part} />
        <ButtonRepeatSprint part={props.part} />
      </div>
      <div className={styles['sprint__result-words-wrapper']}>
        <SprintResultWords data={dataResultSprint.learned} />
        <SprintResultWords data={dataResultSprint.unlearned} />
      </div>
    </div>
  )
}
