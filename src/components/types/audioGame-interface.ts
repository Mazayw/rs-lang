import { IWord } from './interface'

export interface IAnswer {
  word: IWord
  answer: boolean
}

export interface IButton {
  name: string
  group: number
}
