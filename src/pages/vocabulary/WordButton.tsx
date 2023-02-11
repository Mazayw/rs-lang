import styles from './styles.module.scss'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { Context } from '../..'
import { IWord } from '../../components/types/interface'
import useHardWord from '../../hooks/useHardWord'
import useLoadWords from '../../hooks/useLoadWords'

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
    hardWordHandler,
    index,
  }: {
    word: IWord
    hardWordHandler: (word: IWord) => Promise<void>
    index: number
  }) => {
    const { vocabulary, store } = useContext(Context)
    const [isHardWord, toggleWordDifficulty] = useHardWord(word)
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
            //            vocabulary.setSelectedWordId(word.word)
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
            <svg
              onClick={onClickHardWord}
              width='19pt'
              height='19pt'
              viewBox='0 0 512 512'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g id='#000000ff'>
                <path
                  fill={isHardWord ? '#F5443B' : '#171836'}
                  opacity='1.00'
                  d=' M 66.10 42.04 C 81.07 38.10 96.66 39.52 111.95 39.25 C 187.28 39.24 262.61 39.26 337.94 39.24 C 352.84 38.87 368.12 40.75 381.61 47.42 C 386.62 49.94 388.11 57.26 384.66 61.62 C 381.85 65.13 378.38 68.04 375.28 71.29 C 372.20 74.22 369.49 77.65 365.82 79.90 C 363.16 81.50 359.93 80.87 357.08 80.21 C 352.17 79.01 347.10 78.65 342.06 78.65 C 260.71 78.66 179.36 78.66 98.02 78.66 C 89.25 78.60 80.22 78.51 71.90 81.65 C 58.70 86.47 47.81 97.27 42.68 110.34 C 39.33 118.81 39.32 128.07 39.41 137.04 C 39.41 218.34 39.42 299.65 39.40 380.96 C 39.45 388.64 40.29 396.47 43.46 403.55 C 49.85 417.80 63.07 429.15 78.52 432.21 C 86.59 433.68 94.82 433.25 102.98 433.31 C 178.68 433.31 254.37 433.31 330.06 433.31 C 338.23 433.25 346.46 433.68 354.54 432.29 C 373.73 428.62 389.85 412.26 393.19 393.00 C 394.45 385.06 394.02 377.00 394.09 368.99 C 394.11 348.31 394.05 327.62 394.11 306.94 C 394.02 303.78 395.20 300.67 397.49 298.48 C 402.93 292.91 408.53 287.51 413.98 281.95 C 416.22 279.77 418.53 277.26 421.74 276.63 C 427.35 275.58 433.83 280.03 433.45 286.10 C 433.58 317.73 433.46 349.35 433.50 380.98 C 433.56 391.04 432.58 401.20 429.53 410.83 C 424.30 428.04 413.02 442.97 399.08 454.14 C 388.38 462.74 375.54 468.68 362.02 471.14 C 351.48 473.18 340.70 472.69 330.03 472.75 C 251.37 472.76 172.70 472.74 94.03 472.76 C 84.37 472.84 74.62 472.30 65.26 469.74 C 43.93 464.20 25.61 449.63 13.59 431.38 C 4.86 418.13 0.50 402.34 0.00 386.54 L 0.00 125.50 C 0.50 110.18 4.56 94.86 12.81 81.86 C 24.92 62.75 43.95 47.55 66.10 42.04 Z'
                />
                <path
                  fill={isHardWord ? '#F5443B' : '#171836'}
                  opacity='1.00'
                  d=' M 435.68 66.68 C 444.33 57.40 460.30 56.82 469.50 65.58 C 479.69 75.36 489.50 85.53 499.55 95.45 C 505.88 101.18 512.01 108.29 512.00 117.36 L 512.00 119.37 C 511.67 127.33 506.84 134.01 501.12 139.14 C 420.59 219.63 340.09 300.14 259.58 380.65 C 256.03 384.11 252.72 387.95 248.38 390.47 C 239.02 395.89 226.28 394.00 218.86 386.12 C 174.81 342.18 130.82 298.17 86.84 254.15 C 80.23 247.87 77.51 237.97 80.20 229.23 C 81.62 223.99 85.29 219.82 89.11 216.12 C 99.49 205.81 109.77 195.40 120.17 185.12 C 124.84 180.42 131.27 177.40 137.96 177.56 C 144.95 177.37 151.54 180.75 156.30 185.71 C 183.00 212.42 209.74 239.08 236.39 265.84 C 302.88 199.51 369.20 133.01 435.68 66.68 Z'
                />
              </g>
            </svg>
            <svg
              width='19pt'
              height='19pt'
              viewBox='0 0 512 512'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g id='#ffc107ff'>
                <path
                  fill='#${color}'
                  opacity='1.00'
                  d=' M 230.84 27.85 C 234.51 18.92 243.19 12.23 252.83 11.21 C 262.33 10.01 272.26 14.30 277.86 22.06 C 281.34 26.94 283.09 32.75 285.58 38.15 C 303.56 80.19 321.47 122.25 339.50 164.27 C 388.04 168.62 436.58 173.04 485.12 177.49 C 489.79 177.83 494.49 178.89 498.53 181.34 C 506.45 185.87 511.56 194.64 512.00 203.71 L 512.00 205.39 C 511.76 213.04 508.28 220.48 502.50 225.50 C 465.33 258.11 428.14 290.69 390.98 323.30 C 401.75 370.57 412.43 417.85 423.19 465.12 C 425.65 473.34 424.80 482.71 419.76 489.81 C 412.31 501.27 395.72 505.03 383.99 498.08 C 341.32 472.59 298.69 447.04 256.01 421.58 C 213.58 446.97 171.13 472.36 128.65 497.67 C 117.90 504.44 102.61 502.24 94.36 492.53 C 88.41 486.01 86.08 476.51 88.16 467.95 C 99.10 419.71 110.06 371.48 121.00 323.25 C 83.66 290.50 46.32 257.76 8.98 225.01 C 3.48 220.12 0.30 212.90 0.00 205.59 L 0.00 203.73 C 0.37 190.80 10.98 179.19 23.86 177.83 C 73.42 173.23 122.99 168.88 172.55 164.26 C 191.98 118.79 211.41 73.32 230.84 27.85 Z'
                />
                <path
                  // fill={hardWordsId.includes(word.id || word._id) ? '#F5443B' : '#171836'}
                  opacity='1.00'
                  d=' M 230.84 27.85 C 234.51 18.92 243.19 12.23 252.83 11.21 C 262.33 10.01 272.26 14.30 277.86 22.06 C 281.34 26.94 283.09 32.75 285.58 38.15 C 303.56 80.19 321.47 122.25 339.50 164.27 C 388.04 168.62 436.58 173.04 485.12 177.49 C 489.79 177.83 494.49 178.89 498.53 181.34 C 506.45 185.87 511.56 194.64 512.00 203.71 L 512.00 205.39 C 511.76 213.04 508.28 220.48 502.50 225.50 C 465.33 258.11 428.14 290.69 390.98 323.30 C 401.75 370.57 412.43 417.85 423.19 465.12 C 425.65 473.34 424.80 482.71 419.76 489.81 C 412.31 501.27 395.72 505.03 383.99 498.08 C 341.32 472.59 298.69 447.04 256.01 421.58 C 213.58 446.97 171.13 472.36 128.65 497.67 C 117.90 504.44 102.61 502.24 94.36 492.53 C 88.41 486.01 86.08 476.51 88.16 467.95 C 99.10 419.71 110.06 371.48 121.00 323.25 C 83.66 290.50 46.32 257.76 8.98 225.01 C 3.48 220.12 0.30 212.90 0.00 205.59 L 0.00 203.73 C 0.37 190.80 10.98 179.19 23.86 177.83 C 73.42 173.23 122.99 168.88 172.55 164.26 C 191.98 118.79 211.41 73.32 230.84 27.85 Z'
                />
              </g>
            </svg>
          </span>
        </button>
      </li>
    )
  },
)
export default WordButton
