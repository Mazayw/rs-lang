import { useEffect, useState } from 'react'
import { IWord } from '../components/types/interface'
import { createUserWord, updateUserWord } from '../http/userWordsApi'

enum Difficulty {
  HARD = 'hard',
  EASY = 'easy',
}

const useHardWord = (word: IWord) => {
  let userWord = word?.userWord
  const [isHardWord, setIsHardWord] = useState(userWord?.difficulty === Difficulty.HARD)

  const id = word?._id || word?.id

  useEffect(() => {
    updateWord()
  }, [isHardWord])

  const toggleWordDifficulty = () => {
    setIsHardWord((prev) => !prev)
  }

  const updateWord = async () => {
    console.log(isHardWord, userWord?.difficulty, word)
    try {
      const newDifficultyValue = isHardWord ? Difficulty.HARD : Difficulty.EASY
      const newUserData = { ...userWord, difficulty: newDifficultyValue }
      if (userWord) {
        userWord = await (await updateUserWord(id, newUserData)).data
      } else {
        userWord = await (
          await createUserWord(id, {
            difficulty: newDifficultyValue,
            optional: {},
          })
        ).data
      }
    } catch (error) {
      console.log(error)
    }
  }

  const newWord = { ...word, userWord: userWord }

  return { isHardWord, toggleWordDifficulty, newWord }
}

export default useHardWord
