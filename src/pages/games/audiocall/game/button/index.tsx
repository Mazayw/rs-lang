import styles from './styles.module.scss'
import { useEffect, useState, useContext } from 'react'
import helpers from '../../../../../components/helpers'
import { IWord, IUserWord } from '../../../../../components/types/interface'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../../../index'

const AudioChooseButton = observer(
  ({
    index,
    answer,
    choose = '',
    isShowAnswer,
    setShowAnswer,
    setCurrent,
  }: {
    index: number
    answer: IWord
    choose: string
    isShowAnswer: boolean
    setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>
    setCurrent: React.Dispatch<React.SetStateAction<number>>
  }) => {
    const { audioCallStore } = useContext(Context)

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

      audioCallStore.setAnswersArr([
        ...audioCallStore.answersArr,
        { word: answer, answer: isCorrect, isNewWord: isNewWord },
      ])

      await setFilteredArrLength(
        audioCallStore.answersArr.filter((el) => el.answer === false).length,
      )
      if (filteredArrLength > 3) {
        audioCallStore.setGameState(1)
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
  },
)
export default AudioChooseButton
