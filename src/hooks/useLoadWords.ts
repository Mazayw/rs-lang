import { useState } from 'react'
import { getAllAggregatedWords } from '../http/userAggregatedWordsApi'
import { getAllWords } from '../http/wordsApi'
import { IWord } from '../components/types/interface'
import VocabularyStore from '../store/VocabularyStore'
import GlobalStore from '../store/UserStore'

const useLoadWords = (vocabulary: VocabularyStore, store: GlobalStore) => {
  const [words, setWords] = useState([] as IWord[])

  const getWordsData = async () => {
    try {
      if (vocabulary.group === 6) {
        console.log('group', vocabulary.group) // TODO
      } else {
        const data = store.isAuth
          ? await getAllAggregatedWords(vocabulary.group.toString(), vocabulary.page.toString())
          : await getAllWords(vocabulary.group.toString(), vocabulary.page.toString())

        setWords(data)
        return data
      }
    } catch (error) {
      console.log(error)
    }
    return words
  }

  return { words, getWordsData }
}
export default useLoadWords
