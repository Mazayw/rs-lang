import styles from './styles.module.scss'
import CreateTextbookSectionsButtons from './CreateTextbookSectionsButtons'
import { useEffect, useState, useContext } from 'react'
import Word from './Word'
import TextbookPagesButtons from './TextbookPagesButtons'
// import { NavLink } from 'react-router-dom'
// import helpers from '../../components/helpers'
import { IWord } from '../../components/types/interface'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'
import WordButton from './WordButton'
import useLoadWords from '../../hooks/useLoadWords'
import { SETTINGS } from '../../settings'

export const INDEX_STAR_SECTION_BUTTON = 10

const Vocabulary = observer((/* {
    check20WordsInPage,
  }: {
    check20WordsInPage: IWord[]
    setCheck20WordsInPage: React.Dispatch<React.SetStateAction<IWord[]>>
  }*/) => {
  const { vocabulary, store } = useContext(Context)
  const { itemsCount, getWordsData } = useLoadWords(vocabulary, store)
  // const [buttonSectionCurrentIndex, setButtonSectionCurrentIndex] = useState(0)

  useEffect(() => {
    const updateWords = async () => {
      store.setIsLoading(true)
      const words = await getWordsData()
      console.log('Effectwords', words.data.data)
      vocabulary.setWords(words.data)
      vocabulary.setMaxPagesCount(Math.ceil(words.itemsCount / SETTINGS.CARDS_PER_PAGE))

      store.setIsLoading(false)
    }
    updateWords()

    vocabulary.setSelectedWordIndex(0)
  }, [vocabulary.page, vocabulary.group, store.isAuth])

  console.log('init', vocabulary.words)
  return (
    <div
      className={`${styles.textbook} 
        ${/* check20WordsInPage.length === 20 ? styles['textbook_active'] : ''*/ null}`}
    >
      {/* helpers.checkUserLocal() && (
          <div
            className={`${styles['textbook-games-buttons']} ${
              buttonSectionCurrentIndex === INDEX_STAR_SECTION_BUTTON
                ? styles['textbook-games-buttons_none']
                : ''
            } ${
              check20WordsInPage.length === 20
                ? styles['textbook-games-buttons__link_disabled']
                : ''
            }`}
          >
            <NavLink
              to={`./../audiocall/${sessionStorage.getItem(
                'sectionButtonNumber',
              )}/${sessionStorage.getItem('pageButtonNumber')}&startgame`}
              className={styles['textbook-games-buttons__link']}
            >
              Аудиовызов
            </NavLink>
            <NavLink
              to={'./../sprint'}
              className={styles['textbook-games-buttons__link']}
              onClick={() => {
                sessionStorage.setItem('startGame', '1')
              }}
            >
              Спринт
            </NavLink>
          </div>
            )*/}
      <CreateTextbookSectionsButtons />
      {vocabulary?.words.length > 0 ? (
        <>
          <Word />

          <ul className={styles['word-buttons']}>
            {vocabulary.words.map((word, index) => (
              <WordButton key={word.word} word={word} index={index} />
            ))}
          </ul>
        </>
      ) : (
        'no words'
      )}
      <TextbookPagesButtons
      //   buttonSectionCurrentIndex={buttonSectionCurrentIndex}
      //    check20WordsInPage={check20WordsInPage}
      />
    </div>
  )
})
export default Vocabulary
