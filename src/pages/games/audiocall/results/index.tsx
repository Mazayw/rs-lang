import { NavLink } from 'react-router-dom'
import helpers from '../../../../components/helpers'
import { IUserStat } from '../../../../components/types/interface'
import DrawTable from './drawTable'
import styles from './styles.module.scss'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from '../../../../index'

const GameResults = observer(() => {
  const { audioCallStore } = useContext(Context)

  const newGame = () => {
    audioCallStore.setAnswersArr([])
    audioCallStore.setGameState(0)
  }

  const createStat = () => {
    const newWords = helpers.seenNewWords(audioCallStore.answersArr)
    const shareGuessed = helpers.shareGuessed(audioCallStore.answersArr)
    const audioLongestseries = helpers.calcRow(audioCallStore.answersArr)
    const date = new Date().toDateString()

    const result: IUserStat = {
      learnedWords: newWords,
      optional: {
        [`${date}`]: {
          audioNewWords: newWords,
          audioShareGuessed: shareGuessed,
          audioLongestseries: audioLongestseries,
        },
      },
    }

    return result
  }

  helpers.updateStatistic(true, createStat())

  return (
    <div className={styles.content}>
      <h1 className={styles.title}>Ваши результаты</h1>
      <div className={styles['result-block']}>
        {audioCallStore.answersArr.map((el, index) => (
          <DrawTable key={index} word={el} index={index} />
        ))}
      </div>
      <NavLink className={styles.link} to={'/audiocall'}>
        <button type='button' className={styles.button} onClick={newGame}>
          Играть снова
        </button>
      </NavLink>
    </div>
  )
})
export default GameResults
