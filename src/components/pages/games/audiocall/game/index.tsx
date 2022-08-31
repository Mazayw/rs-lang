import styles from './styles.module.scss'
import { IWord } from '../../../../types/interface'
import { useState, useEffect } from 'react'
import AudioChooseButton from './button/index'
import { IAnswer } from '../../../../types/audioGame-interface'

function AudioGameMain({
  setGameState,
  words = [],
  setAnswersArr,
  answersArr,
}: {
  setGameState: React.Dispatch<React.SetStateAction<number>>
  words: IWord[]
  setAnswersArr: React.Dispatch<React.SetStateAction<IAnswer[]>>
  answersArr: IAnswer[]
}) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Array<string>>([])
  const [isShowAnswer, setShowAnswer] = useState(false)

  const url = 'http://localhost:3001/'
  const currentWord = words[current]
  const currentAudio = currentWord && new Audio(`${url}${currentWord.audio}`)
  const shuffleArray = (array: string[]) => {
    return array && array.sort(() => Math.random() - 0.5)
  }

  const onWordPlay = () => {
    currentWord && currentAudio.play()
  }

  useEffect(() => {
    if (words.length) {
      console.log(`${url}${currentWord.audio}`)

      const filtered = () => {
        const res =
          words &&
          words
            .filter((el) => el.id !== currentWord.id)
            .reduce((acc: string[], el) => acc.concat(el.wordTranslate), [])
            .sort(() => Math.random() - 0.5)
        return res
      }
      const answersArray = shuffleArray(filtered()!.slice(0, 4).concat([currentWord.wordTranslate]))
      setAnswers(answersArray!)
      onWordPlay()
      console.log(answersArr)
    }
  }, [current, words])

  return (
    <div className={styles['game-main']}>
      <div className={styles.content}>
        <img src='./icons/audio.svg' alt='Listen word' onClick={onWordPlay} />
        <h1 className={styles.title}>Игра Аудиовызов</h1>
        <h3 className={styles.subtitle}>
          Игра увеличивает словарный запас и понимание речи на слух
        </h3>
        <h3 className={styles.description}>Пожалуйста, выберите уровень сложности:</h3>
        <div className={styles['buttons-block']}>
          {answers.map((el, index) => (
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
