import styles from './styles.module.scss'
import { useState, useEffect, useContext } from 'react'
import { INDEX_STAR_SECTION_BUTTON } from '.'
import { observer } from 'mobx-react-lite'
import { Context } from '../../index'
import { SETTINGS } from '../../settings'
import { IWord } from '../../components/types/interface'
import useHardWord from '../../hooks/useHardWord'
import useLoadWords from '../../hooks/useLoadWords'
import CheckIcon from '../../assets/icons/checkIcon'

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
    const [isHardWord, toggleWordDifficulty, newWord] = useHardWord(word)
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
      const wordsData = await getWordsData()
      vocabulary.setWords(wordsData)
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
                <svg
                  width='40'
                  height='32'
                  viewBox='0 0 40 32'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M32.2529 0.101587C32.9076 -0.0907604 33.6591 0.119571 34.1115 0.632497C35.4349 2.12202 36.5678 3.78199 37.4678 5.56081C39.0811 8.71968 39.9381 12.2523 39.9998 15.7974V16.4511C39.9279 21.6273 38.0881 26.7628 34.8256 30.7825C34.5349 31.161 34.2115 31.5504 33.7443 31.7091C33.0568 31.9796 32.2451 31.7568 31.7521 31.2188C31.2544 30.7857 30.9599 30.1078 31.0935 29.4478C31.1763 28.8989 31.5818 28.4931 31.8974 28.0654C34.4709 24.812 35.9232 20.7 36.0123 16.5543C36.1521 11.8215 34.4357 7.06831 31.3373 3.49425C31.1138 3.23544 30.8935 2.95943 30.7966 2.62634C30.6099 2.05634 30.738 1.4011 31.1201 0.939783C31.424 0.579328 31.7857 0.228255 32.2529 0.101587Z'
                    fill='#D1D1D7'
                  />
                  <path
                    d='M16.9845 2.49959C17.5603 2.00543 18.44 1.89206 19.097 2.29083C19.6892 2.61922 20.0267 3.294 20.0103 3.96175C20.0158 12.0435 20.0103 20.1244 20.0126 28.2061C20.0064 28.5032 19.9837 28.8066 19.8681 29.0842C19.5962 29.773 18.8673 30.2531 18.1259 30.2164C17.6978 30.2086 17.2915 30.0217 16.9681 29.748C13.6798 27.0223 10.393 24.295 7.10473 21.5686C5.31097 21.5615 3.51643 21.5811 1.72267 21.5592C0.803911 21.5388 0.0195314 20.7202 0 19.8069V12.3797C0.0648442 11.468 0.875787 10.6869 1.79532 10.6947C3.56643 10.6814 5.33832 10.6955 7.1102 10.6876C10.4016 7.95882 13.6899 5.22451 16.9845 2.49959Z'
                    fill='#D1D1D7'
                  />
                  <path
                    d='M25.9696 6.35685C26.5438 6.16763 27.2087 6.29352 27.6751 6.67743C27.9641 6.91278 28.1579 7.23649 28.3852 7.52657C30.5673 10.4345 31.5337 14.1993 31.1032 17.8039C30.8282 20.3701 29.8196 22.844 28.2634 24.8988C27.8141 25.4571 27.0165 25.7089 26.3321 25.4845C25.8844 25.357 25.5368 25.0255 25.2391 24.6822C24.8727 24.2584 24.7258 23.6587 24.8501 23.1122C24.9313 22.7126 25.1891 22.385 25.4126 22.055C27.0188 19.7312 27.5915 16.7405 27.0149 13.9804C26.7384 12.5894 26.154 11.268 25.3508 10.1021C25.1344 9.79955 24.8907 9.51572 24.7016 9.19436C24.3485 8.57588 24.4219 7.75332 24.8696 7.2013C25.1673 6.84554 25.5173 6.50072 25.9696 6.35685Z'
                    fill='#D1D1D7'
                  />
                </svg>
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
                color={word?.userWord?.difficulty === 'hard' ? '#F5443B' : '#171836'}
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
              onClick={hardWordButtonClickHandler}
            >
              <svg
                width='40'
                height='39'
                viewBox='0 0 40 39'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M18.0344 1.52785C18.3211 0.829617 18.9992 0.306529 19.7523 0.226776C20.4945 0.132948 21.2703 0.468381 21.7078 1.07513C21.9797 1.4567 22.1164 1.91098 22.3109 2.3332C23.7156 5.62029 25.1148 8.90893 26.5234 12.1945C30.3156 12.5346 34.1078 12.8802 37.9 13.2281C38.2648 13.2547 38.632 13.3376 38.9477 13.5292C39.5664 13.8833 39.9656 14.5691 40 15.2782V15.4096C39.9813 16.0078 39.7094 16.5895 39.2578 16.982C36.3539 19.5318 33.4484 22.0792 30.5453 24.6289C31.3867 28.3249 32.2211 32.0217 33.0617 35.7178C33.2539 36.3605 33.1875 37.0931 32.7938 37.6483C32.2117 38.5443 30.9156 38.8383 29.9992 38.2949C26.6656 36.3018 23.3352 34.3041 20.0008 32.3134C16.6859 34.2986 13.3695 36.2839 10.0508 38.2628C9.21094 38.7922 8.01641 38.6202 7.37187 37.8609C6.90703 37.3511 6.725 36.6083 6.8875 35.939C7.74219 32.1672 8.59844 28.3961 9.45312 24.625C6.53594 22.0643 3.61875 19.5044 0.701562 16.9437C0.271875 16.5613 0.0234375 15.9968 0 15.4252V15.2798C0.0289063 14.2688 0.857813 13.361 1.86406 13.2547C5.73594 12.895 9.60859 12.5549 13.4805 12.1937C14.9984 8.6384 16.5164 5.08312 18.0344 1.52785Z'
                  // fill={isHardWord ? '#F5443B' : '#171836'}
                />
              </svg>
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
