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

  useEffect(() => {
    const onKeypress = (e: KeyboardEvent) => {
      if (e.key === `${index + 1}`) {
        buttonClick()
        setIsClicked(true)
      }
    }
    document.addEventListener('keypress', onKeypress)
    return () => {
      document.removeEventListener('keypress', onKeypress)
    }
  }, [])

  const buttonClick = async () => {
    const isCorrect = choose === answer.wordTranslate
    const newWord: IUserWord = {
      difficulty: 'common',
      optional: {
        totalGuessedAudio: `${Number(isCorrect)}`,
        totalMistakesAudio: `${Number(isCorrect)}`,
        guessedInLine: `${Number(isCorrect)}`,
      },
    }
    const isNewWord = await helpers.updateUserWord(answer.id, newWord, '', true)

    setShowAnswer(true)

    setAnswersArr((prev) => [...prev, { word: answer, answer: isCorrect, isNewWord: isNewWord }])

    const filteredArr = answersArr.filter((el) => el.answer === false).length

    if (filteredArr === 4) {
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
