import styles from './styles.module.scss'
import { IButton, IWord } from '../../../../types/interface'
import apiService from '../../../../api/api-service'

function ChooseButton({
  data,
  setGameState,
  setWords,
}: {
  data: IButton
  setGameState: React.Dispatch<React.SetStateAction<number>>
  setWords: React.Dispatch<React.SetStateAction<IWord[] | never[]>>
}) {
  const page = `${Math.floor(Math.random() * 30)}`
  const getWords = async () => {
    setGameState(1)
    const words = await apiService.getAllWords(`${data.group}`, page)
    setWords(words!)
  }

  return (
    <button
      type='button'
      className={`${styles['choose-button']} ${styles[`button-${data.name}`]}`}
      onClick={() => getWords()}
    >
      <h5>{data.name}</h5>
    </button>
  )
}
export default ChooseButton
