import React from 'react'
import { IDataResultSprintWords } from '../../../../types/sprint-interface'
import styles from '../styles.module.scss'

export function SprintResultWords({ data }: { data: IDataResultSprintWords }) {
  const keyWords = Object.keys(data.words)

  return (
    <div className={styles['sprint__result-true']}>
      <h4 className={styles['sprint__h4']}>
        {data.stateWords}:{' '}
        <span className={styles['sprint__result-color']} style={{ background: `${data.color}` }}>
          {data.countWords}
        </span>
      </h4>
      <ul className={styles['sprint__result-words']} id={styles['sprint__result-words']}>
        {keyWords.map((el) => (
          <li className='sprint__result-word' key={`sprint__result-${el}`}>
            <span style={{ fontWeight: 'bold' }}>{el}</span>
            <span> - {data.words[el]} </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
