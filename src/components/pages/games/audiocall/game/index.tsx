import styles from './styles.module.scss'
import { IWord } from '../../../../types/interface'
import { useState, useEffect } from 'react'
import AudioChooseButton from './button/index'
import { IAnswer } from '../../../../types/audioGame-interface'
import { settings } from '../../../../../settings'

function AudioGameMain({
  setGameState,
  words = [],
  setAnswersArr,
}: {
  setGameState: React.Dispatch<React.SetStateAction<number>>
  words: IWord[]
  setAnswersArr: React.Dispatch<React.SetStateAction<IAnswer[]>>
}) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Array<string>>([])
  const [isShowAnswer, setShowAnswer] = useState(false)

  const url = settings.url
  const currentWord = words[current]

  const shuffleArray = (array: string[]) => {
    return array && array.sort(() => Math.random() - 0.5)
  }

  const onWordPlay = () => {
    if (currentWord) {
      const currentAudio = new Audio(`${url}${currentWord.audio}`)
      currentAudio.play()
    }
  }

  useEffect(() => {
    if (words.length) {
      if (current === words.length) {
        setGameState(3)
      } else {
        const filtered = () => {
          const res =
            words &&
            words
              .filter((el) => el.id !== currentWord.id)
              .reduce((acc: string[], el) => acc.concat(el.wordTranslate), [])
              .sort(() => Math.random() - 0.5)
          return res
        }
        const answersArray = shuffleArray(
          filtered()!.slice(0, 4).concat([currentWord.wordTranslate]),
        )
        setAnswers(answersArray!)
        onWordPlay()
      }
    }
  }, [current, words])

  return (
    <div className={styles['game-main']}>
      <div className={styles.content}>
        <img src='./icons/audio.svg' alt='Listen word' onClick={onWordPlay} />
        <h1 className={styles.title}>Игра Аудиовызов</h1>
        <h3 className={styles.subtitle}>Выберите перевод услышанного слова</h3>
        <div className={styles['buttons-block']}>
          {currentWord &&
            answers.map((el, index) => (
              <AudioChooseButton
                key={index}
                setAnswersArr={setAnswersArr}
                answer={currentWord}
                choose={el}
                isShowAnswer={isShowAnswer}
                setShowAnswer={setShowAnswer}
                setCurrent={setCurrent}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
export default AudioGameMain
