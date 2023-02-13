import { useEffect, useState } from 'react'
import { IWord } from '../components/types/interface'
import { createUserWord, updateUserWord } from '../http/userWordsApi'

enum Difficulty {
  HARD = 'hard',
  EASY = 'easy',
}

const useUpdateWord = (word: IWord) => {
  let userWord = word?.userWord
  const [isHardWord, setIsHardWord] = useState(userWord?.difficulty === Difficulty.HARD)
  const [isStudiedWord, setIsStudiedWord] = useState(userWord?.optional?.isStudied)

  let userWordOptions = {
    difficulty: isHardWord ? Difficulty.HARD : Difficulty.EASY,
    optional: {
      isStudied: isStudiedWord,
    },
  }

  const id = word?._id || word?.id

  useEffect(() => {
    updateWord()
  }, [userWordOptions])

  const toggleWordDifficulty = () => {
    userWordOptions = {
      ...userWordOptions,
      difficulty: !isHardWord ? Difficulty.HARD : Difficulty.EASY,
    }
    setIsHardWord((prev) => !prev)
  }

  const toggleWordLearned = () => {
    userWordOptions = {
      ...userWordOptions,
      optional: { isStudied: !isStudiedWord },
    }
    setIsStudiedWord((prev) => !prev)
  }

  const updateWord = async () => {
    // console.log(isHardWord, userWord?.difficulty, word)
    try {
      if (userWord) {
        userWord = await (await updateUserWord(id, userWordOptions)).data
      } else {
        userWord = await (await createUserWord(id, userWordOptions)).data
      }
    } catch (error) {
      console.log(error)
    }
  }

  const newWord = { ...word, userWord: userWord }

  return { isHardWord, isStudiedWord, toggleWordDifficulty, toggleWordLearned, newWord }
}

export default useUpdateWord
