import styles from './styles.module.scss'
import { IWord, IUserWord } from '../../../../../types/interface'
import { IAnswer } from '../../../../../types/audioGame-interface'
import helpers from '../../../../../helpers'

function AudioChooseButton({
  answer,
  choose = '',
  isShowAnswer,
  setShowAnswer,
  setAnswersArr,
  setCurrent,
}: {
  answer: IWord
  choose: string
  isShowAnswer: boolean
  setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>
  setAnswersArr: React.Dispatch<React.SetStateAction<IAnswer[]>>
  setCurrent: React.Dispatch<React.SetStateAction<number>>
}) {
  const buttonClick = async () => {
    const isCorrect = choose === answer.wordTranslate
    const newWord: IUserWord = {
      difficulty: '',
      optional: {
        totalGuessedAudio: `${Number(isCorrect)}`,
        totalMistakesAudio: `${Number(isCorrect)}`,
        guessedInLine: `${Number(isCorrect)}`,
      },
    }
    const isNewWord = await helpers.updateUserWord(answer.id, newWord, '', true)

    setShowAnswer(true)

    setAnswersArr((prev) => [...prev, { word: answer, answer: isCorrect, isNewWord: isNewWord }])

    setTimeout(() => {
      setShowAnswer(false)
      setCurrent((prev) => prev + 1)
    }, 800)
  }

  return (
    <button
      type='button'
      className={`${styles['choose-button']} ${
        isShowAnswer && choose === answer.wordTranslate && styles['button-active']
      }`}
      onClick={buttonClick}
    >
      <h5>{choose}</h5>
    </button>
  )
}
export default AudioChooseButton
