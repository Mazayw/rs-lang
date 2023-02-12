import styles from './styles.module.scss'
import { useState, useEffect, useContext } from 'react'
import { INDEX_STAR_SECTION_BUTTON } from '.'
import { observer } from 'mobx-react-lite'
import { Context } from '../../index'
import { SETTINGS, VOCABULARY_SETTINGS } from '../../settings'
import { IWord } from '../../components/types/interface'
import useHardWord from '../../hooks/useHardWord'
import useLoadWords from '../../hooks/useLoadWords'
import CheckIcon from '../../assets/icons/checkIcon'
import StarIcon from '../../assets/icons/starIcon'
import GramophoneIcon from '../../assets/icons/gramophoneIcon'

const Word = observer(
  ({
    hardWordHandler,
    ClickStudiedWord,
    ClickHardWord,
    hardWordsId,
    easyWordsId,
    buttonSectionCurrentIndex,
  }: {
    hardWordHandler: (word: IWord) => Promise<void>
    ClickStudiedWord: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => void
    ClickHardWord: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => void
    hardWordsId: string[]
    easyWordsId: string[]

    buttonSectionCurrentIndex: number
  }) => {
    const { store, vocabulary } = useContext(Context)
    const [word, setWord] = useState({} as IWord)
    const { isHardWord, toggleWordDifficulty, newWord } = useHardWord(word)
    const { getWordsData } = useLoadWords(vocabulary, store)

    const [sumGuessed, setSumGuessed] = useState('0')
    // const [word, setWord] = useState(() => filterSelectedWord())
    const [sumMistakes, setSumMistakes] = useState('0')
    // const [isHardWord, setHardWord] = useState(word.userWord?.difficulty === 'hard')

    const [gramophoneButtonDisabled, setGramophoneButtonDisabled] = useState(false)

    const onClickHardWord = async () => {
      await toggleWordDifficulty()
      // updateWordsArray(index, newWord, vocabulary.words, vocabulary.setWords)
      // updateWordsArray()
      getWordsData().then((data) => vocabulary.setWords(data))
    }

    useEffect(() => {
      const index = vocabulary.selectedWordIndex
      const words = vocabulary.words
      setWord(words[index])
      console.log('redraw', word?.userWord?.difficulty)

      console.log('isHardWord', isHardWord)
      console.log('word', word?.userWord?.difficulty)
    }, [vocabulary.selectedWordIndex, vocabulary.words])

    const handlerClickAudio = () => {
      setGramophoneButtonDisabled(true)

      const audioPlayer = new Audio(`${SETTINGS.BASE_URL}/${word.audio}`)
      audioPlayer.play()
      audioPlayer.onended = function () {
        const audioPlayer = new Audio(`${SETTINGS.BASE_URL}/${word.audioMeaning}`)
        audioPlayer.play()
        audioPlayer.onended = function () {
          const audioPlayer = new Audio(`${SETTINGS.BASE_URL}/${word.audioExample}`)
          audioPlayer.play()
          setGramophoneButtonDisabled(false)
        }
      }
    }
    /*
    const getUserWord = async () => {
      const userId = localStorage.getItem('userId')
      const token = localStorage.getItem('token')
      if (userId && token) {
        const dataResponse = await apiService.getUserWord(userId, word.id, token)
        const data = dataResponse.data
        console.log(data)
        const guessedAudio = helpers.undefinedCheck(data?.optional.totalGuessedAudio)
        const guessedSprint = helpers.undefinedCheck(data?.optional.totalGuessedSprint)
        const mistakesAudio = helpers.undefinedCheck(data?.optional.totalMistakesAudio)
        const mistakeSprint = helpers.undefinedCheck(data?.optional.totalMistakesSprint)
        setSumMistakes(`${Number(mistakesAudio) + Number(mistakeSprint)}`)
        setSumGuessed(`${Number(guessedAudio) + Number(guessedSprint)}`)
      }
    }

    useEffect(() => {
      getUserWord()
      console.log(word)
    }, [word.id])*/

    const hardWordButtonClickHandler = () => {
      hardWordHandler(word)
      // setHardWord((prev) => !prev)
    }

    return word ? (
      <>
        <div className={styles['stat-buttons']}></div>
        {/* store.isAuth && (
          <div className={styles['word-game-results']}>
            <p>{`Слово угадано в играх: ${sumGuessed}`}</p>
            <p>{`Слово не угадано в играх: ${sumMistakes}`}</p>
          </div>
        )*/}
        <div
          className={`${word ? styles['word-card'] : styles['word-card_none']} ${
            styles['word-card-background-group-' + vocabulary.group]
          }`}
        >
          <img
            src={`${SETTINGS.BASE_URL}/${word.image}`}
            alt='word'
            className={styles['word-img']}
          />
          <div className={styles['word-card__content']}>
            <h3 className={styles['word-title']}>
              {word.word}
              <button
                className={`${styles['word-gramophone']} ${
                  gramophoneButtonDisabled ? styles['word-gramophone_disabled'] : ''
                }`}
                onClick={handlerClickAudio}
              >
                <GramophoneIcon />
              </button>
            </h3>
            <p className={styles['word-translate']}>
              {word.wordTranslate}
              <span className={styles['word-transcription']}>{word.transcription}</span>
            </p>
            <p
              className={styles['text-meaning']}
              dangerouslySetInnerHTML={{ __html: word.textMeaning }}
            ></p>
            <p className={styles['text-meaning-translate']}>{word.textMeaningTranslate}</p>
            <p
              className={styles['text-meaning']}
              dangerouslySetInnerHTML={{ __html: word.textExample }}
            ></p>
            <p className={styles['text-example-translate']}>{word.textExampleTranslate}</p>
          </div>
          <div
            className={`${styles['words-image-auth']} ${
              store.isAuth ? styles['words-image-auth_active'] : ''
            }`}
          >
            <button
              className={styles['words-image-auth__button']}
              onClick={onClickHardWord}
              // onClick={(e) => ClickStudiedWord(e, word.id || word._id)}
            >
              <CheckIcon
                color={
                  isHardWord
                    ? VOCABULARY_SETTINGS.ACTIVE_ICON_COLOR
                    : VOCABULARY_SETTINGS.DISABLED_ICON_COLOR
                }
                width={'40'}
                height={'40'}
              />
            </button>
            <button
              className={styles['words-image-auth__button']}
              title={
                hardWordsId.includes(word.id || word._id) &&
                buttonSectionCurrentIndex !== INDEX_STAR_SECTION_BUTTON
                  ? 'Перейдите в раздел сложные слова или отметьте как изученное'
                  : ''
              }
              disabled={
                hardWordsId.includes(word.id || word._id) &&
                buttonSectionCurrentIndex !== INDEX_STAR_SECTION_BUTTON
                  ? true
                  : false
              }
              onClick={onClickHardWord}
            >
              <StarIcon
                color={
                  word?.userWord?.difficulty === 'hard'
                    ? VOCABULARY_SETTINGS.ACTIVE_ICON_COLOR
                    : VOCABULARY_SETTINGS.DISABLED_ICON_COLOR
                }
                width={'40'}
                height={'40'}
              />
            </button>
          </div>
        </div>
      </>
    ) : (
      <p className={styles['word-card__empty']}>Сложные слова отсутствуют</p>
    )
  },
)

export default Word
