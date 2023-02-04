import { NavLink } from 'react-router-dom'
import helpers from '../../../../components/helpers'
import { IAnswer } from '../../../../components/types/audioGame-interface'
import { IUserStat } from '../../../../components/types/interface'
import DrawTable from './drawTable'
import styles from './styles.module.scss'

function GameResults({
  setGameState,
  answersArr,
  setAnswersArr,
}: {
  setGameState: React.Dispatch<React.SetStateAction<number>>
  answersArr: IAnswer[]
  setAnswersArr: React.Dispatch<React.SetStateAction<IAnswer[]>>
}) {
  const newGame = () => {
    setAnswersArr([])
    setGameState(0)
  }

  const createStat = () => {
    const newWords = helpers.seenNewWords(answersArr)
    const shareGuessed = helpers.shareGuessed(answersArr)
    const audioLongestseries = helpers.calcRow(answersArr)
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
        {answersArr.map((el, index) => (
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
}
export default GameResults
