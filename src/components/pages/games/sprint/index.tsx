import React, { useState } from 'react'
import { ButtonCloseGame } from './sprint-components/button-close-game'
import { SprintAction } from './sprint-action'
import { SprintResult } from './sprint-result'
import { SptintSelectLevel } from './sprint-select-level'
import styles from './styles.module.scss'
import { GameTimer } from './game-timer'
import { ButtonAudioState } from './sprint-components/button-audio'
import {
  getWordSprint,
  getWordsVocabularySprint,
  sprintService,
} from './sprint-services/sprint-services'

interface ISprintTimes {
  [key: string]: number
}

const SPRINT_BG = './../../rs-lang/img/games/game-sprint-bg.jpg'
const SPRINT_TIMES: ISprintTimes = {
  start: 5,
  action: 60,
}

function Sprint() {
  const [level, setLevel] = useState(0)
  const [part, setPart] = useState(0)
  const [partEnd, setPartEnd] = useState(false)
  const [audio, setAudio] = useState(false)
  const [displayScore, setDisplayScore] = useState(0)
  const [checkVocabulary, setCheckVocabulary] = useState(
    Number(sessionStorage.getItem('startGame')),
  )

  const loadWords = async (group: number, page: number) => {
    console.log()
    await getWordsVocabularySprint(group, page)
    await getWordSprint()
    
  }

  React.useEffect(() => {
    if (checkVocabulary) {
      setCheckVocabulary(0)
      sessionStorage.setItem('startGame', '0')
      sprintService.groupSprintCurrent = Number(sessionStorage.getItem('sectionButtonNumber'))
      sprintService.pageSprintCurrent = Number(sessionStorage.getItem('pageButtonNumber'))
      loadWords(sprintService.groupSprintCurrent, sprintService.pageSprintCurrent)
      setPart(1)
    }
  }, [])

  React.useEffect(() => {
    if (partEnd) {
      setPart(part + 1)
      setPartEnd(false)
    }
    if (part > 3) {
      setPart(0)
    }
  }, [partEnd])

  return (
    <div className={styles['sprint-main']} style={{ backgroundImage: `url(${SPRINT_BG})` }}>
      <div className={styles['sprint__header-part']}>
        <ButtonCloseGame part={setPart} />
        <ButtonAudioState setAudio={setAudio} />
      </div>
      {part === 0 && <h2 className={styles['sprint__title']}>Sprint</h2>}

      {part === 0 && <SptintSelectLevel sprintLevel={setLevel} partEnded={setPartEnd} />}
      {part === 1 && <GameTimer partEnd={setPartEnd} timeInit={SPRINT_TIMES.start} />}
      {part === 2 && (
        <div className={styles['sprint__action-part']}>
          <div className={styles['sprint__action-center']}>
            <SprintAction audio={audio} displayScore={setDisplayScore} partEnd={setPartEnd} />
          </div>
          <div className={styles['sprint__action-right']}>
            <GameTimer partEnd={setPartEnd} timeInit={SPRINT_TIMES.action} />
          </div>
        </div>
      )}
      {part === 3 && (
        <SprintResult partEnded={setPartEnd} part={setPart} displayScore={displayScore} />
      )}
    </div>
  )
}

export default Sprint
