import apiService from './api/api-service'
import { IUserSignInResponse, IWord, IUserWord } from './types/interface'

interface IAnswer {
  word: IWord
  answer: boolean
}

class Helpers {
  optionalUnion = (obj1: IUserWord, obj2: IUserWord) => {
    const o1 = obj1.optional
    const o2 = obj2.optional
    const obj3 = Object.assign({}, obj1)
    Object.keys(o2).map(
      (key) =>
        (o1[key as keyof typeof o1] = `${
          Number(o2[key as keyof typeof o2]) + Number(o1[key as keyof typeof o1] || 0)
        }`),
    )
    return obj3
  }

  authorize(data: IUserSignInResponse) {
    localStorage.setItem('token', data.token)
    localStorage.setItem('refreshToken', data.refreshToken)
    localStorage.setItem('userId', data.userId)
    localStorage.setItem('tokenTime', Date())
  }

  logaut() {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('tokenTime')
  }

  async checkUser() {
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('userId')
    if (token && id) {
      const res = await apiService.getUserToken(id, token)
      if (res?.status === 200) {
        this.authorize(res.data)
        return true
      } else {
        this.logaut()
        return false
      }
    }
  }

  checkUserLocal() {
    const timeToken = localStorage.getItem('tokenTime')
    if (!timeToken) return false
    const timeTokenDate = new Date(timeToken)
    const timeNow = new Date()
    const timeDiff = (timeNow.getTime() - timeTokenDate.getTime()) / 1000 / 60 / 60
    return timeDiff < 3.5 ? true : false
  }

  calcRow(arr: IAnswer[]) {
    const arrAnswers = arr
      .reduce((acc: string[], el) => acc.concat(el.answer ? '1' : '0'), [])
      .join('')
      .split('0')
      .map((el) => el.length)
    return Math.max.apply(null, arrAnswers)
  }

  async updateUserWord(
    wordId: string,
    newWordData: IUserWord,
    difficulty = '',
    checkLocal = false,
  ) {
    const checker = checkLocal ? this.checkUserLocal() : await this.checkUser()
    if (checker) {
      const token = localStorage.getItem('token') as string
      const userId = localStorage.getItem('userId') as string
      const userWord = await apiService.getUserWord(userId, wordId, token)
      if (userWord?.status === 200) {
        const body = this.optionalUnion(userWord.data, newWordData)
        if (difficulty) body.difficulty = difficulty
        await apiService.updateUserWord(userId, wordId, body, token)
        return false // Word is already known
      }
      if (userWord?.status === 404) {
        await apiService.createUserWord(userId, wordId, newWordData, token)
        return true // New word
      }
    }
  }
}

export default new Helpers()

/*
obj
{
  "difficulty": "string",
  "optional": {
    "totalGuessedSprint": 
    "totalMistakesSprint":
    "totalGuessedAudio": 
    "totalMistakesAudio":
    "guessedInLine":
  }
}

learned words
.reduce((acc: string[], el) => acc.concat(el.wordTranslate), [])
*/
