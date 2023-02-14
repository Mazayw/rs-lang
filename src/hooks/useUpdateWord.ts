import { useEffect, useState } from 'react'
import { IWord } from '../components/types/interface'
import { createUserWord, updateUserWord } from '../http/userWordsApi'

const Difficulty = {
  HARD: 'hard',
  EASY: 'easy',
}

const useUpdateWord = (word: IWord) => {
  const id = word?._id
  const isNewWord = !word?.userWord?.optional || !word?.userWord?.difficulty
  console.log(
    'word?.userWord?.optional',
    JSON.stringify(word?.userWord?.optional),
    'word?.userWord.difficulty',
    JSON.stringify(word?.userWord?.difficulty),
    'isNewWord',
    isNewWord,
  )

  const [userWord, setUserWord] = useState(word?.userWord)
  const [isHardWord, setIsHardWord] = useState(userWord?.difficulty === Difficulty.HARD)
  const [isStudiedWord, setIsStudiedWord] = useState(userWord?.optional?.isStudied)

  const [updateOptions, setUpdateOptions] = useState(word?.userWord)

  useEffect(() => {
    if (id) {
      updateWord()
    }
  }, [updateOptions])

  const toggleWordDifficulty = () => {
    if (id) {
      setUpdateOptions((prev) => ({
        ...prev,
        difficulty: !isHardWord ? Difficulty.HARD : Difficulty.EASY,
      }))
      setIsHardWord((prev) => !prev)
    }
  }

  const toggleWordLearned = () => {
    if (id) {
      setUpdateOptions((prev) => ({
        ...prev,
        optional: { isStudied: !isStudiedWord },
      }))
      setIsStudiedWord((prev) => !prev)
    }
  }

  const updateWord = async () => {
    const oldWord = JSON.stringify(word?.userWord)
    const newWord = JSON.stringify(updateOptions)

    if (id && oldWord !== newWord) {
      try {
        const newUserWord = isNewWord
          ? await (
              await createUserWord(id, updateOptions)
            ).data
          : await (
              await updateUserWord(id, updateOptions)
            ).data

        setUserWord(newUserWord)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const newWord = { ...word, userWord }

  return { isHardWord, isStudiedWord, toggleWordDifficulty, toggleWordLearned, newWord }
}

export default useUpdateWord
