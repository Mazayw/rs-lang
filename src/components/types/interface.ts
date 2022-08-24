export interface IWord {
  id: string
  group: number
  page: number
  word: string
  image: string
  audio: string
  audioMeaning: string
  audioExample: string
  textMeaning: string
  textExample: string
  transcription: string
  wordTranslate: string
  textMeaningTranslate: string
  textExampleTranslate: string
}

export interface IUser {
  name: string
  email: string
  password: string
}

export interface IToken {
  message: string
  token: string
  refreshToken: string
  userId: string
  name: string
}

export interface IUserWord {
  difficulty: string
  optional: unknown
}

export interface IUserStat {
  learnedWords: number
  optional: unknown
}

export interface IUserSettings {
  wordsPerDay: number
  optional: unknown
}

export interface IUserSignIn {
  email: string
  password: string
}

export interface IUserSignInResponse {
  message: string
  token: string
  refreshToken: string
  userId: string
  name: string
}

export interface IMenuMain {
  title: string
  url: string
}

export interface IMenu {
  title: string
  url: string
  submenu?: Array<IMenuMain>
}
