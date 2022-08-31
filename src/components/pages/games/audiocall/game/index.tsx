import styles from './styles.module.scss'
import { IWord } from '../../../../types/interface'
import { useState, useEffect } from 'react'
import AudioChooseButton from './button/index'
import { IAnswer } from '../../../../types/audioGame-interface'
import { settings } from '../../../../../settings'
import { useParams } from 'react-router-dom'
import apiService from '../../../../api/api-service'
import GameResults from '../results'

function AudioGameMain() {
  const { groupUrl, pageUrl } = useParams()
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Array<string>>([])
  const [isShowAnswer, setShowAnswer] = useState(false)
  const [gameState, setGameState] = useState(0)
  const [words, setWords] = useState<Array<IWord | never>>([])
  const [answersArr, setAnswersArr] = useState<IAnswer[]>([])

  const currentWord = words[current]
  const group = Number(groupUrl) > 6 ? '0' : groupUrl
  const page = Number(pageUrl) > 30 ? '0' : groupUrl

  const shuffleArray = (array: string[]) => {
    return array && array.sort(() => Math.random() - 0.5)
  }

  const getWords = async () => {
    const wordsArr = await apiService.getAllWords(group, page)
    wordsArr && setWords(wordsArr)
  }

  const onWordPlay = () => {
    if (currentWord) {
      const currentAudio = new Audio(`${settings.url}${currentWord.audio}`)
      currentAudio.play()
    }
  }
  useEffect(() => {
    if (current) {
      newWord()
    }
  }, [current])

  useEffect(() => {
    getWords()
    setGameState(0)
    setAnswersArr([])
  }, [])

  useEffect(() => {
    newWord()
  }, [words])

  const newWord = () => {
    if (words.length) {
      onWordPlay()
      if (current === words.length) {
        setGameState(1)
      } else {
        const filtered = () => {
          return words
            .filter((el) => el.id !== currentWord.id)
            .reduce((acc: string[], el) => acc.concat(el.wordTranslate), [])
            .sort(() => Math.random() - 0.5)
        }
        const answersArray = shuffleArray(
          filtered().slice(0, 4).concat([currentWord.wordTranslate]),
        )
        setAnswers(answersArray!)
      }
    }
  }

  return (
    <div className={styles['game-main']}>
      {gameState ? (
        <GameResults
          setGameState={setGameState}
          answersArr={answersArr}
          setAnswersArr={setAnswersArr}
        />
      ) : (
        <div className={styles.content}>
          <img src='../../icons/audio.svg' alt='Listen word' onClick={onWordPlay} />
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
      )}
    </div>
  )
}
export default AudioGameMain
