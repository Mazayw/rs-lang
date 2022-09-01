import apiService from './api/api-service'
import { IUserSignInResponse, IUserWord } from './types/interface'
import { IAnswer } from './types/audioGame-interface'

class Helpers {
  optionalUnion(oldWord: IUserWord, newWord: IUserWord) {
    const oldShadow = JSON.parse(JSON.stringify(oldWord))
    const new2Shadow = JSON.parse(JSON.stringify(newWord))

    const o1 = oldShadow.optional
    const o2 = new2Shadow.optional

    Object.keys(o2).map((key) => {
      if (o2[key] === '0' && key === 'guessedInLine') {
        o1[key] = '0'
      } else {
        o1[key] = `${Number(o2[key]) + Number(o1[key] || 0)}`
      }
    })
    return oldShadow
  }

  authorize(data: IUserSignInResponse) {
    data.token && localStorage.setItem('token', data.token)
    data.refreshToken && localStorage.setItem('refreshToken', data.refreshToken)
    data.userId && localStorage.setItem('userId', data.userId)
    localStorage.setItem('tokenTime', Date())
  }

  logaut() {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('tokenTime')
  }

  async checkUser() {
    const token = localStorage.getItem('refreshToken')
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

  seenNewWords(arr: IAnswer[]) {
    return arr.reduce((acc, el) => acc + Number(el.isNewWord), 0)
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

      if (userWord === 404) {
        await apiService.createUserWord(userId, wordId, newWordData, token)
        return true // New word
      }
      if (userWord?.status === 200) {
        delete userWord.data.wordId
        delete userWord.data.id
        const body = this.optionalUnion(userWord.data, newWordData)
        if (difficulty) body.difficulty = difficulty
        await apiService.updateUserWord(userId, wordId, body, token)
        return false // Word is already known
      }
    }
    return false
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
