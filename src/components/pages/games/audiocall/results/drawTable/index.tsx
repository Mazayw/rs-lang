import styles from './styles.module.scss'
import { IAnswer } from '../../../../../types/audioGame-interface'
import { settings } from '../../../../../../settings'

function DrawTable({ word, index }: { word: IAnswer; index: number }) {
  const currentWord = word.word
  const currentAudio = new Audio(`${settings.url}${currentWord.audio}`)

  return (
    <>
      <div className={`${styles.word} ${styles.eng}`}>{index + 1}</div>
      <img
        className={`${styles.word} ${styles.icon}`}
        src='./../../rs-lang/icons/audio.svg'
        alt='Listen word'
        onClick={() => currentAudio.play()}
      />
      <div className={`${styles.word} ${styles.eng}`}>{currentWord.word}</div>
      <div className={`${styles.word} ${styles.eng}`}>{currentWord.transcription}</div>
      <div className={`${styles.word} ${styles.translate}`}>{currentWord.wordTranslate}</div>
      <div className={`${styles.word} ${styles.correct}`}>{word.answer ? '✔️' : '❌'}</div>
    </>
  )
}
export default DrawTable
