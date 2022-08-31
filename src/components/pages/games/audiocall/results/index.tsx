import styles from './styles.module.scss'
import { IAnswer } from '../../../../types/audioGame-interface'
import DrawTable from './drawTable/index'

function GameResults({
  setGameState,
  answersArr,
}: {
  setGameState: React.Dispatch<React.SetStateAction<number>>
  answersArr: IAnswer[]
}) {
  return (
    <div className={styles.content}>
      <h1 className={styles.title}>Ваши результаты</h1>
      <div className={styles['result-block']}>
        {answersArr.map((el, index) => (
          <DrawTable key={index} word={el} index={index} />
        ))}
      </div>
      <button type='button' className={styles.button} onClick={() => setGameState(0)}>
        Играть снова
      </button>
    </div>
  )
}
export default GameResults
