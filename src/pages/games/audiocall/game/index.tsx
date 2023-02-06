import { observer } from 'mobx-react-lite'
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import apiService from '../../../../api/api-service'
import helpers from '../../../../components/helpers'
import { IWord } from '../../../../components/types/interface'
import { SETTINGS, settings } from '../../../../settings'
import GameResults from '../results'
import AudioChooseButton from './button'
import styles from './styles.module.scss'
import { Context } from '../../../../index'

const AudioGameMain = observer(() => {
  const { audioCallStore } = useContext(Context)
  const { group, page } = useParams()
  const [current, setCurrent] = useState(0)
  const [isShowAnswer, setShowAnswer] = useState(false)
  const [words, setWords] = useState<Array<IWord | never>>([])
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
    console.log('Words loading, please wait')

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
    if (currentWord && audioCallStore.gameState === 0 && audioCallStore.looseCounter <= 4) {
      const currentAudio = new Audio(`${SETTINGS.BASE_URL}/${currentWord.audio}`)
      currentAudio.play()
    }
  }

  useEffect(() => {
    if (current) {
      heartCount()
      if (audioCallStore.looseCounter <= 4) newWord()
    }
  }, [current])

  useEffect(() => {
    heartCount()
    helpers.checkUser()
    audioCallStore.setGameState(0)
    audioCallStore.setAnswersArr([])
    getWords()
  }, [])

  useEffect(() => {
    if (audioCallStore.looseCounter > 4) audioCallStore.setGameState(1)
  }, [audioCallStore.looseCounter])

  useEffect(() => {
    newWord()
  }, [words])

  const newWord = () => {
    if (words.length && audioCallStore.gameState === 0) {
      if (current === words.length || audioCallStore.looseCounter > 4) {
        audioCallStore.setGameState(1)
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
        audioCallStore.setAnswers(answersArray)
      }
    }
  }

  const heartCount = () => {
    const arr = heart.length ? heart : Array(5).fill(1)
    const heartLoose = audioCallStore.answersArr.filter((el) => el.answer === false).length
    audioCallStore.setLooseCounter(heartLoose)
    arr.fill(0, 0, heartLoose)
    setHeart(arr)
  }

  return (
    <div className={styles['game-main']}>
      {audioCallStore.gameState ? (
        <GameResults />
      ) : (
        currentWord && (
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
                audioCallStore.answers.map((el, index) => (
                  <AudioChooseButton
                    key={index + el}
                    index={index}
                    answer={currentWord}
                    choose={el}
                    isShowAnswer={isShowAnswer}
                    setShowAnswer={setShowAnswer}
                    setCurrent={setCurrent}
                  />
                ))}
            </div>
          </div>
        )
      )}
    </div>
  )
})
export default AudioGameMain
