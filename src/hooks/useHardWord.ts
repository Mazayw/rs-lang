import { useEffect, useRef, useState } from 'react'
import { IWord } from '../components/types/interface'
import { createUserWord, updateUserWord } from '../http/userWordsApi'

enum Difficulty {
  HARD = 'hard',
  EASY = 'easy',
}

const useHardWord = (word: IWord) => {
  const [isHardWord, setIsHardWord] = useState(false)
  const isHardWordRef = useRef(isHardWord)

  let userWord = word?.userWord
  const id = word?._id || word?.id

  useEffect(() => {
    const isHard = userWord?.difficulty === Difficulty.HARD
    setIsHardWord(isHard)
  }, [word])

  useEffect(() => {
    isHardWordRef.current = isHardWord
  }, [isHardWord])

  const toggleWordDifficulty = async () => {
    setIsHardWord((prev) => !prev)
    isHardWordRef.current = !isHardWordRef.current

    try {
      const newDifficultyValue = isHardWordRef.current ? Difficulty.HARD : Difficulty.EASY
      console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhooo', newDifficultyValue, isHardWordRef.current)
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

  return [isHardWord, toggleWordDifficulty, newWord] as const
}

export default useHardWord
