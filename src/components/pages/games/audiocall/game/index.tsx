import styles from './styles.module.scss'
import { IWord } from '../../../../types/interface'
import { useState, useEffect } from 'react'
import AudioChooseButton from './button/index'
import { IAnswer } from '../../../../types/audioGame-interface'
import { settings } from '../../../../../settings'
import { useParams } from 'react-router-dom'
import apiService from '../../../../api/api-service'
import GameResults from '../results'
import helpers from '../../../../helpers'

function AudioGameMain() {
  const { group, page } = useParams()
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Array<string>>([])
  const [isShowAnswer, setShowAnswer] = useState(false)
  const [gameState, setGameState] = useState(0)
  const [words, setWords] = useState<Array<IWord | never>>([])
  const [answersArr, setAnswersArr] = useState<IAnswer[]>([])
  const [heart, setHeart] = useState<number[]>([])

  const currentWord = words[current]

  const shuffleArray = (array: string[]) => {
    return array && array.sort(() => Math.random() - 0.5)
  }

  const urlCheck = () => {
    const groupChk = typeof group === 'string' ? group : '0'
    const pageChk = typeof page === 'string' ? page : '0'
    const pageChkSplited = pageChk.split('&')
    const isVocabularyGame = pageChkSplited.length > 1

    const groupUrl = Number(groupChk) > settings.maxGroup ? '0' : groupChk
    const pageUrl = Number(pageChkSplited[0]) > settings.maxPage ? '0' : pageChkSplited[0]
    return [groupUrl, pageUrl, isVocabularyGame]
  }

  const getWords = async () => {
    const [groupUrl, pageUrl, isVocabularyGame] = urlCheck()
    let wordsArr
    if (isVocabularyGame) {
      wordsArr = await helpers.getUnlearnedWords(
        groupUrl as string,
        pageUrl as string,
        20,
        'unknownOrUnlearned',
      )
    } else {
      wordsArr = await apiService.getAllWords(groupUrl as string, pageUrl as string)
    }
    wordsArr?.sort(() => Math.random() - 0.5)
    wordsArr && setWords(wordsArr)
  }

  const onWordPlay = () => {
    if (currentWord && gameState === 0) {
      const currentAudio = new Audio(`${settings.url}${currentWord.audio}`)
      currentAudio.play()
    }
  }

  useEffect(() => {
    if (current) {
      heartCount()
      newWord()
    }
  }, [current])

  useEffect(() => {
    helpers.checkUser()
    setGameState(0)
    setAnswersArr([])
    getWords()
    heartCount()
  }, [])

  useEffect(() => {
    newWord()
  }, [words])

  const newWord = () => {
    if (words.length && gameState === 0) {
      if (current === words.length) {
        setGameState(1)
      } else {
        onWordPlay()

        const filtered = () => {
          return words
            .filter((el) => el.id !== currentWord.id || el._id !== currentWord._id)
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

  const heartCount = () => {
    const arr = heart.length ? heart : Array(5).fill(1)
    const heartLoose = answersArr.filter((el) => el.answer === false).length
    arr.fill(0, 0, heartLoose)
    setHeart(arr)
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
          <img
            src='./../../rs-lang/icons/audio.svg'
            alt='Listen word'
            onClick={onWordPlay}
            className={styles.audio}
          />
          <h1 className={styles.title}>Игра Аудиовызов</h1>
          <div className={styles.lifes}>
            {heart.map((el, index) => (
              <img
                src={
                  el ? '../../rs-lang/icons/hearth-filled.svg' : '../../rs-lang/icons/hearth.svg'
                }
                alt='heart'
                className={styles.heart}
                key={index}
              />
            ))}
          </div>
          <h3 className={styles.subtitle}>Выберите перевод услышанного слова</h3>
          <div className={styles['buttons-block']}>
            {currentWord &&
              answers.map((el, index) => (
                <AudioChooseButton
                  key={index}
                  index={index}
                  setAnswersArr={setAnswersArr}
                  answer={currentWord}
                  choose={el}
                  isShowAnswer={isShowAnswer}
                  setShowAnswer={setShowAnswer}
                  setCurrent={setCurrent}
                  answersArr={answersArr}
                  setGameState={setGameState}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
export default AudioGameMain
