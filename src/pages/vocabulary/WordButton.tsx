import styles from './styles.module.scss'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { Context } from '../..'
import { IWord } from '../../components/types/interface'
import useLoadWords from '../../hooks/useLoadWords'
import CheckIcon from '../../assets/icons/checkIcon'
import { VOCABULARY_SETTINGS } from '../../settings'
import StarIcon from '../../assets/icons/starIcon'
import useUpdateWord from '../../hooks/useUpdateWord'

const WordButton = observer(({ word, index }: { word: IWord; index: number }) => {
  const { vocabulary, store } = useContext(Context)
  /* const { isHardWord, toggleWordDifficulty } = useHardWord(word)
    const { isStudiedWord, toggleWordLearned } = useLearnedWords(word)*/
  const { isHardWord, isStudiedWord, toggleWordDifficulty, toggleWordLearned } = useUpdateWord(word)

  const { getWordsData } = useLoadWords(vocabulary, store)

  const onClickHardWord = async () => {
    await toggleWordDifficulty()
    const wordsData = await getWordsData()
    vocabulary.setWords(wordsData)
  }

  const onClickLearnedWord = async () => {
    await toggleWordLearned()
    getWordsData().then((data) => vocabulary.setWords(data))
  }

  useEffect(() => {
    console.log('change array')
  }, [vocabulary.words])

  return (
    <li className={styles['word-button-list']}>
      <button
        className={`${styles['word-button']} ${
          index === vocabulary.selectedWordIndex && styles['word-button_active']
        }`}
        onClick={() => {
          vocabulary.setSelectedWordIndex(index)
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
          <button className={styles['words-image-auth__button']} onClick={onClickLearnedWord}>
            <CheckIcon
              color={
                isStudiedWord
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
})
export default WordButton
