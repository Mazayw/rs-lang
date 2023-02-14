import styles from './styles.module.scss'
import { useState, useEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../index'
import { SETTINGS, VOCABULARY_SETTINGS } from '../../settings'
import { IWord } from '../../components/types/interface'
import useLoadWords from '../../hooks/useLoadWords'
import CheckIcon from '../../assets/icons/checkIcon'
import StarIcon from '../../assets/icons/starIcon'
import GramophoneIcon from '../../assets/icons/gramophoneIcon'

import useUpdateWord from '../../hooks/useUpdateWord'

const Word = observer(() => {
  const { store, vocabulary } = useContext(Context)
  const [word, setWord] = useState({} as IWord)
  /* const { isHardWord, toggleWordDifficulty } = useHardWord(word)
  const { toggleWordLearned } = useLearnedWords(word)*/
  const { getWordsData } = useLoadWords(vocabulary, store)
  const { toggleWordDifficulty, toggleWordLearned } = useUpdateWord(word)

  const [gramophoneButtonDisabled, setGramophoneButtonDisabled] = useState(false)

  const onClickHardWord = async () => {
    await toggleWordDifficulty()

    getWordsData().then((data) => vocabulary.setWords(data))
  }

  const onClickLearnedWord = async () => {
    await toggleWordLearned()
    getWordsData().then((data) => vocabulary.setWords(data))
  }

  useEffect(() => {
    if (vocabulary.words) {
      const index = vocabulary.selectedWordIndex
      const words = vocabulary.words
      setWord(words[index])
    }
  }, [vocabulary.selectedWordIndex, vocabulary.words])

  const handlerClickAudio = () => {
    setGramophoneButtonDisabled(true)
    const audio = [word.audio, word.audioMeaning, word.audioExample]
    const playAudios = (audios: string[]) => {
      let i = 0
      const playNextAudio = () => {
        if (i < audios.length) {
          const audio = new Audio(`${SETTINGS.BASE_URL}/${audios[i]}`)
          audio.play()
          i++
          audio.onended = playNextAudio
        }
      }
      playNextAudio()
    }
    playAudios(audio)
    setGramophoneButtonDisabled(false)
  }

  return word ? (
    <>
      <div className={styles['stat-buttons']}></div>

      <div
        className={`${word ? styles['word-card'] : styles['word-card_none']} ${
          styles['word-card-background-group-' + vocabulary.group]
        }`}
      >
        <img src={`${SETTINGS.BASE_URL}/${word.image}`} alt='word' className={styles['word-img']} />
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
          {store.isAuth && (
            <>
              {' '}
              <button className={styles['words-image-auth__button']} onClick={onClickLearnedWord}>
                <CheckIcon
                  color={
                    word?.userWord?.optional?.isStudied
                      ? VOCABULARY_SETTINGS.ACTIVE_ICON_COLOR
                      : VOCABULARY_SETTINGS.DISABLED_ICON_COLOR
                  }
                  width={'40'}
                  height={'40'}
                />
              </button>
              <button className={styles['words-image-auth__button']} onClick={onClickHardWord}>
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
            </>
          )}
        </div>
      </div>
    </>
  ) : (
    <p className={styles['word-card__empty']}>Сложные слова отсутствуют</p>
  )
})

export default Word
