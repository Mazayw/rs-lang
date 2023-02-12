import { useEffect, useState } from 'react'
import { IWord } from '../components/types/interface'
import { createUserWord, updateUserWord } from '../http/userWordsApi'

const useLearnedWords = (word: IWord) => {
  let userWord = word?.userWord
  const [isStudiedWord, setIsStudiedWord] = useState(userWord?.optional?.isStudied)

  const id = word?._id || word?.id

  useEffect(() => {
    updateWord()
  }, [isStudiedWord])

  const toggleWordLearned = () => {
    setIsStudiedWord((prev) => !prev)
  }

  const updateWord = async () => {
    try {
      const newUserData = { ...userWord, optional: { isStudied: isStudiedWord } }
      console.log(newUserData)
      if (userWord) {
        userWord = await (await updateUserWord(id, newUserData)).data
      } else {
        userWord = await (
          await createUserWord(id, {
            difficulty: 'easy',
            optional: {
              isStudied: isStudiedWord,
            },
          })
        ).data
      }
    } catch (error) {
      console.log(error)
    }
  }

  const newWord = { ...word, userWord: userWord }

  return { isStudiedWord, toggleWordLearned, newWord }
}

export default useLearnedWords
