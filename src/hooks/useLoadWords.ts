import { useState } from 'react'
import { getAllAggregatedWords } from '../http/userAggregatedWordsApi'
import { getAllWords } from '../http/wordsApi'
import { IWord } from '../components/types/interface'
import VocabularyStore from '../store/VocabularyStore'
import GlobalStore from '../store/UserStore'
import { SETTINGS } from '../settings'

const useLoadWords = (vocabulary: VocabularyStore, store: GlobalStore) => {
  const [words, setWords] = useState([] as IWord[])
  const [itemsCount, setItemsCount] = useState(0)

  const getWordsData = async () => {
    try {
      if (vocabulary.group === 6) {
        const data = await getAllAggregatedWords({
          page: vocabulary.page.toString(),
          wordsPerPage: SETTINGS.CARDS_PER_PAGE.toString(),
          filter: '{"userWord.difficulty":"hard"}',
        })
        setWords(data.data)
        setItemsCount(data.itemsCount)
        return data.data
      } else {
        const data = store.isAuth
          ? await getAllAggregatedWords({
              group: vocabulary.group.toString(),
              page: vocabulary.page.toString(),
              wordsPerPage: SETTINGS.CARDS_PER_PAGE.toString(),
            })
          : await getAllWords(vocabulary.group.toString(), vocabulary.page.toString())
        data.itemsCount
        console.log('hook', data)
        setWords(data.data)
        setItemsCount(data.itemsCount)
        return data
      }
    } catch (error) {
      console.log(error)
    }
    return { words }
  }

  return { words, getWordsData, itemsCount }
}
export default useLoadWords
