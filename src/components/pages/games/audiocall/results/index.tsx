import styles from './styles.module.scss'
import { IAnswer } from '../../../../types/audioGame-interface'
import DrawTable from './drawTable/index'
import { NavLink } from 'react-router-dom'
import helpers from '../../../../helpers'

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

  const newWords = helpers.seenNewWords(answersArr)

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
