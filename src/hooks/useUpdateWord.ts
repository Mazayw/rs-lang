/* import { useEffect, useState } from 'react'
import { IWord } from '../components/types/interface'
import { createUserWord, updateUserWord } from '../http/userWordsApi'
import Vocabulary from '../pages/vocabulary/index';

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
*/

import { useEffect, useState } from 'react'
import { IWord } from '../components/types/interface'
import { createUserWord, updateUserWord } from '../http/userWordsApi'

enum Difficulty {
  HARD = 'hard',
  EASY = 'easy',
}

const useUpdateWord = (word: IWord) => {
  const id = word?._id || word?.id
  const isNewWord = !!word?.userWord?.difficulty && !!word?.userWord?.optional?.isStudied
  console.log(isNewWord, 'isNewWord')

  const [userWord, setUserWord] = useState(word?.userWord)
  const [isHardWord, setIsHardWord] = useState(userWord?.difficulty === Difficulty.HARD)
  const [isStudiedWord, setIsStudiedWord] = useState(userWord?.optional?.isStudied)

  const [updateOptions, setUpdateOptions] = useState({
    difficulty: isHardWord ? Difficulty.HARD : Difficulty.EASY,
    optional: {
      isStudied: isStudiedWord,
    },
  })

  useEffect(() => {
    if (id) {
      updateWord()
    }
  }, [updateOptions])

  const toggleWordDifficulty = () => {
    if (id) {
      setUpdateOptions({
        ...updateOptions,
        difficulty: !isHardWord ? Difficulty.HARD : Difficulty.EASY,
      })
      setIsHardWord((prev) => !prev)
    }
  }

  const toggleWordLearned = () => {
    if (id) {
      setUpdateOptions({
        ...updateOptions,
        optional: { isStudied: !isStudiedWord },
      })
      setIsStudiedWord((prev) => !prev)
    }
  }

  const updateWord = async () => {
    if (id) {
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
