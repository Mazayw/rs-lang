import React, { useState } from 'react'
import { sprintDescription } from './sprint-data'
import { SptintSelectList } from './sprint-components/sprint-select-list'
import styles from './styles.module.scss'
import {
  getWordsAllForGroupSprint,
  getWordSprint,
  sprintService,
} from './sprint-services/sprint-services'

interface IPropsSprintSelectLevel {
  sprintLevel: React.Dispatch<React.SetStateAction<number>>
  partEnded: React.Dispatch<React.SetStateAction<boolean>>
}

const keyData = 'sprint'

export function SptintSelectLevel(props: IPropsSprintSelectLevel) {
  const [level, setLevel] = useState(0)

  const loadWords = async (group: number) => {
    await getWordsAllForGroupSprint(group)
    await getWordSprint()
  }

  React.useEffect(() => {
    if (level) {
      sprintService.groupSprintCurrent = level
      props.partEnded(true)
      loadWords(sprintService.groupSprintCurrent)
      props.sprintLevel(level)
    }
  }, [level])

  return (
    <div className={styles['sprint__select-level']}>
      <div className={styles['sptint__description']}>
        <img
          className={styles['sptint__description-image']}
          src={sprintDescription[keyData].image}
          alt={`${keyData} game`}
        />
        <div className={styles['sptint__description-content']}>
          {sprintDescription[keyData].content}
        </div>
      </div>
      <h3 className={styles['sprint__h3']}>Выберите уровень:</h3>
      <SptintSelectList sprintLevel={setLevel} />
    </div>
  )
}
