import styles from './styles.module.scss'
import { IButton, IWord } from '../../../../types/interface'
import apiService from '../../../../api/api-service'

function ChooseButton({
  data,
  setGameState,
  words,
}: {
  data: IButton
  setGameState: React.Dispatch<React.SetStateAction<number>>
  words: IWord[] | undefined
}) {
  const page = `${Math.floor(Math.random() * 30)}`
  const getWords = async () => {
    setGameState(1)
    words = await apiService.getAllWords(`${data.group}`, page)
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
