import styles from './styles.module.scss'
import { IWord, IUserWord } from '../../../../../types/interface'
import { IAnswer } from '../../../../../types/audioGame-interface'
import helpers from '../../../../../helpers'
import { useEffect, useState } from 'react'

function AudioChooseButton({
  index,
  answer,
  choose = '',
  isShowAnswer,
  setShowAnswer,
  setAnswersArr,
  setCurrent,
  answersArr,
  setGameState,
}: {
  index: number
  answer: IWord
  choose: string
  isShowAnswer: boolean
  setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>
  setAnswersArr: React.Dispatch<React.SetStateAction<IAnswer[]>>
  setCurrent: React.Dispatch<React.SetStateAction<number>>
  answersArr: IAnswer[]
  setGameState: React.Dispatch<React.SetStateAction<number>>
}) {
  const [isClicked, setIsClicked] = useState(false)
  const [filteredArrLength, setFilteredArrLength] = useState(0)

  const onKeypress = (e: KeyboardEvent) => {
    if (e.key === `${index + 1}`) {
      buttonClick()
      setIsClicked(true)
    }
  }

  useEffect(() => {
    document.addEventListener('keyup', onKeypress)
    return () => {
      document.removeEventListener('keyup', onKeypress)
    }
  }, [])

  const buttonClick = async () => {
    const isCorrect = choose === answer.wordTranslate
    const newWord: IUserWord = {
      difficulty: 'easy',
      optional: {
        totalGuessedAudio: `${Number(isCorrect)}`,
        totalMistakesAudio: `${Number(!isCorrect)}`,
        guessedInLine: `${Number(isCorrect)}`,
      },
    }
    const isNewWord = await helpers.updateUserWord(answer.id, newWord, '', true)

    await setShowAnswer(true)

    await setAnswersArr((prev) => [
      ...prev,
      { word: answer, answer: isCorrect, isNewWord: isNewWord },
    ])

    await setFilteredArrLength(answersArr.filter((el) => el.answer === false).length)
    if (filteredArrLength > 3) {
      setGameState(1)
    } else {
      setTimeout(() => {
        setIsClicked(false)
        setShowAnswer(false)
        setCurrent((prev) => prev + 1)
      }, 800)
    }
  }

  return (
    <button
      type='button'
      className={`${styles['choose-button']} ${
        isShowAnswer && choose === answer.wordTranslate && styles['button-active']
      } ${isClicked && choose && styles['clicked']}`}
      onClick={buttonClick}
    >
      <h5>
        {index + 1}. {choose}
      </h5>
    </button>
  )
}
export default AudioChooseButton
