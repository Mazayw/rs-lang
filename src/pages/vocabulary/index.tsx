import styles from './styles.module.scss'
import CreateTextbookSectionsButtons from './CreateTextbookSectionsButtons'
import { useEffect, useState, useContext } from 'react'
import Word from './Word'
import TextbookPagesButtons from './TextbookPagesButtons'
import { NavLink } from 'react-router-dom'
import apiService from '../../api/api-service'
import helpers from '../../components/helpers'
import { IWord, IUserWord } from '../../components/types/interface'
import { Context } from '../../index'
import {
  updateUserWord,
  getUserWord,
  createUserWord,
  getAllUserWords,
} from '../../http/userWordsApi'
import { observer } from 'mobx-react-lite'
import { getAllWords } from '../../http/wordsApi'
import { AxiosError } from 'axios'
import { getAllAggregatedWords } from '../../http/userAggregatedWordsApi'
import WordButton from './WordButton'
import useLoadWords from '../../hooks/useLoadWords'

export const INDEX_STAR_SECTION_BUTTON = 10

const Vocabulary = observer(
  ({
    check20WordsInPage,
    setCheck20WordsInPage,
  }: {
    check20WordsInPage: IWord[]
    setCheck20WordsInPage: React.Dispatch<React.SetStateAction<IWord[]>>
  }) => {
    const { vocabulary, store } = useContext(Context)
    const { getWordsData } = useLoadWords(vocabulary, store)

    const [hardWord, setHardWord] = useState([] as IWord[])
    const [easyWord, setEasyWord] = useState([] as IWord[])
    const [hardWordsId, setHardWordsId] = useState([] as string[])
    const [easyWordsId, setEasyWordsId] = useState([] as string[])
    const [commonWordsId, setCommonWordsId] = useState([] as string[])
    const [dbUserWords, setDbUserWords] = useState([] as IUserWord[])

    const [buttonSectionCurrentIndex, setButtonSectionCurrentIndex] = useState(0)
    const [textbookNumberPage, setTextbookNumberPage] = useState(0)
    const [token, setToken] = useState(localStorage.getItem('userId') as string)
    const [userId, setUserId] = useState(localStorage.getItem('token') as string)

    const [allWordsId, setAllWordsId] = useState([] as string[])
    let filterAllWordsId = [] as string[]

    function chek20EasyWords(first: string[], second: IWord[]) {
      return first.reduce((acc: IWord[], item) => {
        const val = second.find((el) => el.id === item)
        return val ? [...acc, val] : acc
      }, [])
    }
    /*
    const getWords = async () => {
      store.setIsLoading(true)

      try {
        if (vocabulary.group === 6) {
          console.log('group', vocabulary.group) // TODO
        } else {
          let data
          if (store.isAuth) {
            console.log(1, store.isAuth)
            data = await getAllAggregatedWords(
              vocabulary.group.toString(),
              vocabulary.page.toString(),
            )
          } else {
            data = await getAllWords(vocabulary.group.toString(), vocabulary.page.toString())
            console.log(2)
          }

          vocabulary.setWords(data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        store.setIsLoading(false)
      }
    }
    /*
    const getSelectedWord = () => {
      console.log('fire')

      if (vocabulary.words.length > 0) {
        const selectedWord = vocabulary.words.find((el) => el.word === vocabulary.selectedWordId)
        console.log(selectedWord)
        selectedWord && vocabulary.setWord(selectedWord as IWord)
      }
    }

    useEffect(() => {
      getSelectedWord()
    }, [vocabulary.selectedWordId, vocabulary.words])*/

    useEffect(() => {
      const setWords = async () => {
        store.setIsLoading(true)
        const words = await getWordsData()
        vocabulary.setWords(words)
        store.setIsLoading(false)
      }
      setWords()

      // getWords()
      vocabulary.setSelectedWordIndex(0)
    }, [vocabulary.page, vocabulary.group, store.isAuth])
    /*
    useEffect(() => {
      getWords()
      ;(async function () {
        if (token) {
          setCheck20WordsInPage([])
          const authUserWordsResponse = await apiService.getAllUserWords(
            localStorage.getItem('userId') as string,
            localStorage.getItem('token') as string,
          )
          const authUserWords = authUserWordsResponse?.data
          if (authUserWords) {
            const id = authUserWords.reduce(
              (acc: string[], item: IUserWord) =>
                item.difficulty === 'hard' ? [...acc, item.optional.wordId] : acc,
              [] as string[],
            ) as string[]
            const studiedWordsId = authUserWords.reduce(
              (acc: string[], item: IUserWord) =>
                item.optional.isStudied ? [...acc, item.optional.wordId] : acc,
              [] as string[],
            ) as string[]
            const commonId = authUserWords.reduce(
              (acc: string[], item: IUserWord) =>
                item.difficulty !== 'hard' && !item.optional.isStudied
                  ? [...acc, item.optional.wordId]
                  : acc,
              [] as string[],
            ) as string[]
            filterAllWordsId = [...id, ...studiedWordsId]

            setAllWordsId(() => filterAllWordsId)

            setHardWordsId(() => id)
            setEasyWordsId(() => studiedWordsId)
            setCommonWordsId(() => commonId)
            const arrWordsInPage = (await apiService.getAllWords(
              vocabulary.group.toString(),
              vocabulary.page.toString(),
            )) as IWord[]
            const check = chek20EasyWords(filterAllWordsId, arrWordsInPage)

            setCheck20WordsInPage(() => check)

            if (+vocabulary.group === INDEX_STAR_SECTION_BUTTON) {
              const data = (await apiService.getAllAgregatedWordsFilterHard(
                userId,
                '3600',
                token,
              )) as [{ paginatedResults: IWord[]; totalCount: [{ count: number }] }]
              // setWords(() => data[0].paginatedResults)
              // setWord(() => data[0].paginatedResults[0])
            }
          }
          setDbUserWords(() => authUserWords)
        }
      })()
    }, [])
*/
    const handlerClickHardWord = async (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      wordId: string,
    ) => {
      if (INDEX_STAR_SECTION_BUTTON === buttonSectionCurrentIndex) {
        const body = {
          difficulty: 'easy',
          optional: {
            isStudied: false,
            activeColor: '#F5443B',
            wordId: wordId,
          },
        }
        //       const putResponse = await updateUserWord(userId, wordId, body)
        //     const put = putResponse?.data as IUserWord

        const dbDelWord = dbUserWords.filter(
          (word) => word.optional.wordId !== wordId,
        ) as IUserWord[]
        //      setDbUserWords(() => [...dbDelWord, put])

        const deleteHardWordsId = hardWordsId.filter((id) => id !== wordId)
        setHardWordsId(deleteHardWordsId)

        setCommonWordsId(() => [...commonWordsId, wordId])

        filterAllWordsId = allWordsId.filter((id) => id !== wordId)
        setAllWordsId(() => filterAllWordsId)

        const data = (await apiService.getAllAgregatedWordsFilterHard(userId, '3600', token)) as [
          { paginatedResults: Array<IWord>; totalCount: [{ count: number } | []] },
        ]

        if (data[0].paginatedResults.length !== 0) {
          // setWords(() => data[0].paginatedResults)
          // setWord(() => data[0].paginatedResults[0])
          setHardWord(() => data[0].paginatedResults)
          // setButtonWordCurrentIndex(0)
        } else {
          // setWords(() => [])
          // setWord({} as IWord)
          setHardWord(() => [])
          setHardWordsId(() => [])
        }
        return
      }

      if (easyWordsId.includes(wordId)) {
        setCheck20WordsInPage([])

        const dbDelWord = dbUserWords.filter(
          (word) => word.optional.wordId !== wordId,
        ) as IUserWord[]
        const deleteEasyWordsId = easyWordsId.filter((id) => id !== wordId)
        setEasyWordsId(deleteEasyWordsId)
        const deleteEasyWord = easyWord.filter((word) => (word.id || word._id) !== wordId)
        setEasyWord(deleteEasyWord)

        const body = {
          difficulty: 'hard',
          optional: {
            isStudied: false,
            activeColor: '#F5443B',
            wordId: wordId,
          },
        }
        const dataResponse = await apiService.updateUserWord(userId, wordId, body, token)
        const data = dataResponse?.data as IUserWord
        setDbUserWords(() => [...dbDelWord, data])
        setHardWord([...hardWord, vocabulary.word])
        setHardWordsId([...hardWordsId, wordId])

        const arrWordsInPage = (await apiService.getAllWords(
          buttonSectionCurrentIndex.toString(),
          textbookNumberPage.toString(),
        )) as IWord[]
        const check = chek20EasyWords(allWordsId, arrWordsInPage)
        setCheck20WordsInPage(() => check)
      } else if (commonWordsId.includes(wordId)) {
        setCheck20WordsInPage([])

        const dbDelWord = dbUserWords.filter(
          (word) => word.optional.wordId !== wordId,
        ) as IUserWord[]
        const deleteCommonId = commonWordsId.filter((id) => id !== wordId)
        setCommonWordsId(deleteCommonId)

        const body = {
          difficulty: 'hard',
          optional: {
            isStudied: false,
            activeColor: '#F5443B',
            wordId: wordId,
          },
        }
        const dataResponse = await apiService.updateUserWord(userId, wordId, body, token)
        const data = dataResponse?.data as IUserWord

        setDbUserWords(() => [...dbDelWord, data])
        setHardWord([...hardWord, vocabulary.word])
        setHardWordsId([...hardWordsId, wordId])

        filterAllWordsId = [...allWordsId, wordId]
        setAllWordsId(() => filterAllWordsId)

        const arrWordsInPage = (await apiService.getAllWords(
          buttonSectionCurrentIndex.toString(),
          textbookNumberPage.toString(),
        )) as IWord[]
        const check = chek20EasyWords(filterAllWordsId, arrWordsInPage)
        setCheck20WordsInPage(() => check)
      } else {
        setCheck20WordsInPage([])
        const body = {
          difficulty: 'hard',
          optional: {
            isStudied: false,
            activeColor: '#F5443B',
            wordId: wordId,
          },
        }
        const dataResponse = await apiService.createUserWord(userId, wordId, body, token)
        const data = dataResponse?.data as IUserWord

        setDbUserWords(() => [...dbUserWords, data])
        setHardWord([...hardWord, vocabulary.word])
        setHardWordsId([...hardWordsId, wordId])

        filterAllWordsId = [...allWordsId, wordId]
        setAllWordsId(() => filterAllWordsId)

        const arrWordsInPage = (await apiService.getAllWords(
          buttonSectionCurrentIndex.toString(),
          textbookNumberPage.toString(),
        )) as IWord[]
        const check = chek20EasyWords(filterAllWordsId, arrWordsInPage)
        setCheck20WordsInPage(() => check)
      }
    }

    const handlerClickHardButton = async () => {
      setCheck20WordsInPage([])
      // setButtonWordCurrentIndex(0)
      setButtonSectionCurrentIndex(10)
      setTextbookNumberPage(0)
      const userId = localStorage.getItem('userId') as string
      const token = localStorage.getItem('token') as string

      setToken(token)

      if (!token) {
        // setWords(() => [])
        // setWord({} as IWord)
        sessionStorage.setItem('sectionButtonNumber', '10')
      } else {
        const data = (await apiService.getAllAgregatedWordsFilterHard(userId, '3600', token)) as [
          { paginatedResults: Array<IWord>; totalCount: [{ count: number } | []] },
        ]

        if (data[0].paginatedResults.length !== 0) {
          // setWords(() => data[0].paginatedResults)
          // setWord(() => data[0].paginatedResults[0])
        } else {
          // setWords(() => [])
          // setWord({} as IWord)
        }
        sessionStorage.setItem('sectionButtonNumber', '10')
      }
    }

    const handlerClickStudiedWord = async (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      wordId: string,
    ) => {
      const userId = localStorage.getItem('userId') as string
      const token = localStorage.getItem('token') as string
      setToken(token)
      setCheck20WordsInPage([])

      if (INDEX_STAR_SECTION_BUTTON === buttonSectionCurrentIndex) {
        const dbDelWord = dbUserWords.filter(
          (word) => word.optional.wordId !== wordId,
        ) as IUserWord[]
        const deleteHardWordsId = hardWordsId.filter((id) => id !== wordId)
        setHardWordsId(deleteHardWordsId)

        const body = {
          difficulty: 'easy',
          optional: {
            isStudied: true,
            activeColor: '#F5443B',
            wordId: wordId,
          },
        }

        const putResponse = await apiService.updateUserWord(userId, wordId, body, token)
        const put = putResponse?.data as IUserWord

        setDbUserWords(() => [...dbDelWord, put])
        setEasyWord([...easyWord, vocabulary.word])
        setEasyWordsId([...easyWordsId, wordId])

        const data = (await apiService.getAllAgregatedWordsFilterHard(userId, '3600', token)) as [
          { paginatedResults: Array<IWord>; totalCount: [{ count: number } | []] },
        ]

        if (data[0].paginatedResults.length !== 0) {
          // setWords(() => data[0].paginatedResults)
          // setWord(() => data[0].paginatedResults[0])
          setHardWord(() => data[0].paginatedResults)
        } else {
          // setWords(() => [])
          // setWord({} as IWord)
          setHardWord(() => [])
          setHardWordsId(() => [])
        }

        return
      }

      if (easyWordsId.includes(wordId)) {
        const body = {
          difficulty: 'easy',
          optional: {
            isStudied: false,
            activeColor: '#F5443B',
            wordId: wordId,
          },
        }
        const putResponse = await apiService.updateUserWord(userId, wordId, body, token)
        const put = putResponse?.data as IUserWord

        const dbDelWord = dbUserWords.filter(
          (word) => word.optional.wordId !== wordId,
        ) as IUserWord[]
        setDbUserWords(() => [...dbDelWord, put])

        setCommonWordsId(() => [...commonWordsId, wordId])

        const deleteEasyWordsId = easyWordsId.filter((id) => id !== wordId)
        setEasyWordsId(deleteEasyWordsId)

        filterAllWordsId = allWordsId.filter((id) => id !== wordId)
        setAllWordsId(() => filterAllWordsId)

        const deleteEasyWord = easyWord.filter((word) => (word.id || word._id) !== wordId)
        setEasyWord(deleteEasyWord)
        // setWords(() => words)

        const data = (await apiService.getAllWords(
          buttonSectionCurrentIndex.toString(),
          textbookNumberPage.toString(),
        )) as IWord[]
        const check = chek20EasyWords(filterAllWordsId, data)
        setCheck20WordsInPage(() => check)
        return
      }

      if (hardWordsId.includes(wordId)) {
        const dbDelWord = dbUserWords.filter(
          (word) => word.optional.wordId !== wordId,
        ) as IUserWord[]
        const deleteHardWordsId = hardWordsId.filter((id) => id !== wordId)
        setHardWordsId(deleteHardWordsId)
        setHardWord(hardWord.filter((word) => (word.id || word._id) !== wordId))

        const body = {
          difficulty: 'easy',
          optional: {
            isStudied: true,
            activeColor: '#F5443B',
            wordId: wordId,
          },
        }
        const dataResponse = await apiService.updateUserWord(userId, wordId, body, token)
        const data = dataResponse?.data as IUserWord

        setDbUserWords(() => [...dbDelWord, data])
        // setEasyWord([...easyWord, word])
        setEasyWordsId([...easyWordsId, wordId])

        const arrWordsInPage = (await apiService.getAllWords(
          buttonSectionCurrentIndex.toString(),
          textbookNumberPage.toString(),
        )) as IWord[]
        const check = chek20EasyWords(allWordsId, arrWordsInPage)
        setCheck20WordsInPage(() => check)
      } else if (commonWordsId.includes(wordId)) {
        const dbDelWord = dbUserWords.filter(
          (word) => word.optional.wordId !== wordId,
        ) as IUserWord[]
        const deleteCommonWordsId = commonWordsId.filter((id) => id !== wordId)
        setCommonWordsId(deleteCommonWordsId)

        const body = {
          difficulty: 'easy',
          optional: {
            isStudied: true,
            activeColor: '#F5443B',
            wordId: wordId,
          },
        }
        const dataResponse = await apiService.updateUserWord(userId, wordId, body, token)
        const data = dataResponse?.data as IUserWord

        setDbUserWords(() => [...dbDelWord, data])
        // setEasyWord([...easyWord, word])
        setEasyWordsId([...easyWordsId, wordId])

        filterAllWordsId = [...allWordsId, wordId]
        setAllWordsId(() => filterAllWordsId)

        const arrWordsInPage = (await apiService.getAllWords(
          buttonSectionCurrentIndex.toString(),
          textbookNumberPage.toString(),
        )) as IWord[]
        const check = chek20EasyWords(filterAllWordsId, arrWordsInPage)
        setCheck20WordsInPage(() => check)
      } else {
        const body = {
          difficulty: 'easy',
          optional: {
            isStudied: true,
            activeColor: '#F5443B',
            wordId: wordId,
          },
        }
        const dataResponse = await apiService.createUserWord(userId, wordId, body, token)
        const data = dataResponse?.data as IUserWord

        setDbUserWords(() => [...dbUserWords, data])
        // setEasyWord([...easyWord, word])
        setEasyWordsId(() => [...easyWordsId, wordId])

        filterAllWordsId = [...allWordsId, wordId]
        setAllWordsId(() => filterAllWordsId)

        const arrWordsInPage = (await apiService.getAllWords(
          buttonSectionCurrentIndex.toString(),
          textbookNumberPage.toString(),
        )) as IWord[]
        setCheck20WordsInPage(() => chek20EasyWords(filterAllWordsId, arrWordsInPage))
      }
    }

    const hardWordHandler = async (word: IWord) => {
      const userWordData = await getUserWord(word._id)
      console.log('11111', userWordData)

      try {
        const newDifficultyValue = userWordData.data.difficulty === 'easy' ? 'hard' : 'easy'

        console.log('click', newDifficultyValue)
        console.log('цщкв вфеф', userWordData.data)
        delete userWordData.data.id

        await updateUserWord(word._id, {
          difficulty: newDifficultyValue,
          optional: userWordData.data.optional,
        })
      } catch (error) {
        const err = error as AxiosError
        console.log(error)

        if (err.code === '404') {
          await createUserWord(word.id, {
            difficulty: 'hard',
            optional: {},
          })
        }
      }
    }

    return (
      <div
        className={`${styles.textbook} ${
          check20WordsInPage.length === 20 ? styles['textbook_active'] : ''
        }`}
      >
        {helpers.checkUserLocal() && (
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
        )}
        <CreateTextbookSectionsButtons />
        <Word
          ClickStudiedWord={handlerClickStudiedWord}
          ClickHardWord={handlerClickHardWord}
          hardWordsId={hardWordsId}
          easyWordsId={easyWordsId}
          buttonSectionCurrentIndex={buttonSectionCurrentIndex}
          hardWordHandler={hardWordHandler}
        />{' '}
        <ul className={styles['word-buttons']}>
          {vocabulary.words.map((word, index) => (
            <WordButton
              key={word.word}
              word={word}
              index={index}
              // hardWordsId={hardWordsId}
              // easyWordsId={easyWordsId}
              //              hardWordHandler={hardWordHandler}
            />
          ))}
        </ul>
        <TextbookPagesButtons
          buttonSectionCurrentIndex={buttonSectionCurrentIndex}
          check20WordsInPage={check20WordsInPage}
        />
      </div>
    )
  },
)
export default Vocabulary
