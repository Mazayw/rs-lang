import apiService from '../../../../api/api-service'
import { IWord } from '../../../../types/interface'
import { IAnswer } from '../../../../types/sprint-interface'
import { dataSprintWords } from '../sprint-data'

export const sprintService = {
  groupSprintCurrent: 0,
  pageSprintCurrent: 0,
}

export const sprintDisplayWord = {
  word: {} as IWord,
  translate: '',
  answer: false,
}

export const sprintAnswer: IAnswer = {
  word: {} as IWord,
  answer: false,
  isNewWord: false,
}

export const sprintAnswers: IAnswer[] = []

const countPagesAdd = 30
const percentTrueWords = 0.6

export const getWordsSprint = async (group: number, page = 0) => {
  const wordsSprint = await apiService.getAllWords(`${group}`, `${page}`)
  return wordsSprint
}

export const getWordsAllForGroupSprint = async (group: number, page = 0) => {
  const words100: IWord[] = []
  dataSprintWords.length = 0
  const countPages = page + countPagesAdd
  for (let i = page; i < countPages; i += 1) {
    const words = (await getWordsSprint(group, i)) as IWord[]
    words100.push(...words)
  }
  dataSprintWords.push(...words100)
  return words100
}

export const getWordsVocabularySprint = async (group: number, page = 0) => {
  dataSprintWords.length = 0
  const words = await helpers.getUnlearnedWords(`${group}`, `${page}`, 600)

  if (words.length === 0) {
    getWordsAllForGroupSprint(group)
  } else {
    dataSprintWords.push(...words)
  }
  return words
}

const shuffle = (array: IWord[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min)
}

export const getWordSprint = async () => {
  let checkAvailableWords = false

  if (dataSprintWords.length === 1) {
    return checkAvailableWords
  } else {
    checkAvailableWords = true
  }

  await shuffle(dataSprintWords)
  const word: IWord = dataSprintWords.pop() as IWord
  sprintAnswer.word = { ...word }

  const answer = Math.random() < percentTrueWords
  sprintDisplayWord.word = { ...word }
  sprintDisplayWord.translate = word.wordTranslate
  sprintDisplayWord.answer = answer

  if (!answer) {
    const wordsFalsy = randomNumber(0, dataSprintWords.length - 1)
    sprintDisplayWord.translate = dataSprintWords[wordsFalsy].wordTranslate
  }

  return checkAvailableWords
}

export const saveSatatisticsSprint = (ans: boolean) => {
  sprintAnswer.answer = ans

  // there is need check in-row

  sprintAnswers.push({ ...sprintAnswer })
}
