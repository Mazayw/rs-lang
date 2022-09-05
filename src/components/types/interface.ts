

export interface IWord {
  id: string
  _id: string
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
  userWord: IUserWord
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
  optional: {
    totalGuessedSprint?: string
    totalMistakesSprint?: string
    totalGuessedAudio?: string
    totalMistakesAudio?: string
    guessedInLine?: string
    isStudied?: boolean
    activeColor?: string
    wordId?: string
  }
}

export interface IUserStat {
  learnedWords: number
  optional: {
    [key: string]: {
      sprintNewWords?: number
      sprintShareGuessed?: number
      sprintLongestseries?: number
      audioNewWords?: number
      audioShareGuessed?: number
      audioLongestseries?: number
    }
  }
}

export interface IGameStat {
  date?: string
  sprintNewWords?: number
  sprintShareGuessed?: number
  sprintLongestseries?: number
  audioNewWords?: number
  audioShareGuessed?: number
  audioLongestseries?: number
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

