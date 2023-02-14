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

        await setWords(data.data)
        await setItemsCount(data.itemsCount)
        return { words: data.data, itemsCount: data.itemsCount }
      } else {
        const data = store.isAuth
          ? await getAllAggregatedWords({
              group: vocabulary.group.toString(),
              page: vocabulary.page.toString(),
              wordsPerPage: SETTINGS.CARDS_PER_PAGE.toString(),
            })
          : await getAllWords(vocabulary.group.toString(), vocabulary.page.toString())

        await setWords(data?.data)
        await setItemsCount(data?.itemsCount)
        return { words: data.data, itemsCount: data.itemsCount }
      }
    } catch (error) {
      console.log(error)
    }
    return { words, itemsCount }
  }

  return { words, getWordsData, itemsCount }
}
export default useLoadWords
