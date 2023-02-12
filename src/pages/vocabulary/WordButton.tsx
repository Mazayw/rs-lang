import styles from './styles.module.scss'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { Context } from '../..'
import { IWord } from '../../components/types/interface'
import useHardWord from '../../hooks/useHardWord'
import useLoadWords from '../../hooks/useLoadWords'
import CheckIcon from '../../assets/icons/checkIcon'
import { VOCABULARY_SETTINGS } from '../../settings'
import StarIcon from '../../assets/icons/starIcon'

const updateWordsArray2 = (
  index: number,
  word: IWord,
  words: IWord[],
  func: (words: IWord[]) => void,
) => {
  console.log(words)
  const newWords: IWord[] = words.map((el) => {
    return { ...{ ...el } }
  })
  newWords[index] = word
  /*
  const newWords = words.map((el) => {
    if (el.word === word.word) {
      return word
    }
    return { ...el }
  })*/
  console.log(newWords)
  func(newWords)
}

const WordButton = observer(
  ({
    word,
    // hardWordHandler,
    index,
  }: {
    word: IWord
    // hardWordHandler: (word: IWord) => Promise<void>
    index: number
  }) => {
    const { vocabulary, store } = useContext(Context)
    const { isHardWord, toggleWordDifficulty } = useHardWord(word)
    const { getWordsData } = useLoadWords(vocabulary, store)

    const onClickHardWord = async () => {
      await toggleWordDifficulty()
      // updateWordsArray(index, newWord, vocabulary.words, vocabulary.setWords)
      // updateWordsArray()
      const wordsData = await getWordsData()
      vocabulary.setWords(wordsData)
    }

    useEffect(() => {
      console.log('change array')
    }, [vocabulary.words])

    /*
    const updateWordsArray = () => {
      const newWords: IWord[] = vocabulary.words.map((el) => {
        return { ...{ ...el } }
      })
      newWords[index] = word

      console.log('newWords', newWords)
      vocabulary.setWords(newWords)
    }*/

    return (
      <li className={styles['word-button-list']}>
        <button
          className={`${styles['word-button']} ${
            index === vocabulary.selectedWordIndex && styles['word-button_active']
          }`}
          onClick={() => {
            vocabulary.setSelectedWordIndex(index)
            // vocabulary.setSelectedWordId(word.word)
          }}
        >
          <span className={styles['word-button-container']}>
            <span className={styles['word-button__word']}>{word.word}</span>
            <span className={styles['word-button__translate']}>{word.wordTranslate}</span>
          </span>
          <span
            className={`${styles['word-button-container-icon']} ${
              store.isAuth ? styles['word-button-container-icon_active'] : ''
            }`}
          >
            <button
              className={styles['words-image-auth__button']}
              onClick={() => {
                console.log('click')
              }}
            >
              <CheckIcon
                color={
                  isHardWord // FIX IT
                    ? VOCABULARY_SETTINGS.ACTIVE_ICON_COLOR
                    : VOCABULARY_SETTINGS.DISABLED_ICON_COLOR
                }
                width={'19'}
                height={'19'}
              />
            </button>
            <button onClick={onClickHardWord} className={styles['words-image-auth__button']}>
              <StarIcon
                color={
                  isHardWord
                    ? VOCABULARY_SETTINGS.ACTIVE_ICON_COLOR
                    : VOCABULARY_SETTINGS.DISABLED_ICON_COLOR
                }
                width={'19'}
                height={'19'}
              />
            </button>
          </span>
        </button>
      </li>
    )
  },
)
export default WordButton
