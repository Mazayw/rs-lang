import { IWord } from './interface'

export interface IDataResultSprint {
  score: number
  learned: IDataResultSprintWords
  unlearned: IDataResultSprintWords
}

export interface IDataResultSprintWords {
  stateWords: string
  countWords: number
  words: { [key: string]: string }
  color: string
}

export interface IDataWordsSprint {
  [key: string]: string
}

export interface IPropsGameTimer {
  timeInit: number
  partEnd: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IAnswer {
  word: IWord
  answer: boolean
  isNewWord: boolean
}
