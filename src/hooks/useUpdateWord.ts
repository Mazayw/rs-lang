import { useEffect, useState } from 'react'
import { IWord } from '../components/types/interface'
import { createUserWord, updateUserWord } from '../http/userWordsApi'

const Difficulty = {
  HARD: 'hard',
  EASY: 'easy',
}

type TUserOption = {
  difficulty?: string
  optional?: {
    isStudied: boolean
  }
}

const useUpdateWord = (word: IWord) => {
  const id = word?._id
  const isSeen = !!word?.userWord

  const [userWord, setUserWord] = useState(word?.userWord)
  const [isHardWord, setIsHardWord] = useState(userWord?.difficulty === Difficulty.HARD)
  const [isStudiedWord, setIsStudiedWord] = useState(!!userWord?.optional?.isStudied)
  const [updateOptions, setUpdateOptions] = useState(word?.userWord)

  useEffect(() => {
    const oldWord = JSON.stringify(word?.userWord)
    const newWord = JSON.stringify(updateOptions)

    if (id && oldWord !== newWord) {
      updateWord()
    }
  }, [updateOptions])

  const toggleWordDifficulty = () => {
    if (id) {
      const newWord: TUserOption = {
        difficulty: !isHardWord ? Difficulty.HARD : Difficulty.EASY,
        optional: { isStudied: !isHardWord ? false : isStudiedWord },
      }

      setUpdateOptions((prev) => ({
        ...prev,
        ...newWord,
      }))
      setIsHardWord((prev) => !prev)
    }
  }

  const toggleWordLearned = () => {
    if (id) {
      const newWord: TUserOption = {
        optional: { isStudied: !isStudiedWord },
      }

      if (!isStudiedWord) newWord.difficulty = Difficulty.EASY

      setUpdateOptions((prev) => ({
        ...prev,
        ...newWord,
      }))
      setIsStudiedWord((prev) => !prev)
    }
  }

  const updateWord = async () => {
    try {
      const newUserWord = isSeen
        ? await (
            await updateUserWord(id, updateOptions)
          ).data
        : await (
            await createUserWord(id, updateOptions)
          ).data

      setUserWord(newUserWord)
    } catch (error) {
      console.log(error)
    }
  }

  const newWord = { ...word, userWord }

  return { isHardWord, isStudiedWord, toggleWordDifficulty, toggleWordLearned, newWord }
}

export default useUpdateWord
