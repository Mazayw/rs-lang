import apiService from './api/api-service'
import { IUserSignInResponse, IWord, IUserWord } from './types/interface'

interface IAnswer {
  word: IWord
  answer: boolean
}

class Helpers {
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

  calcRow(arr: IAnswer[]) {
    const arrAnswers = arr
      .reduce((acc: string[], el) => acc.concat(el.answer ? '1' : '0'), [])
      .join('')
      .split('0')
      .map((el) => el.length)
    return Math.max.apply(null, arrAnswers)
  }

  async totalGuessedSprint(wordId: string) {
    if (await this.checkUser()) {
      const token = localStorage.getItem('token') as string
      const userId = localStorage.getItem('userId') as string
      const userWord = await apiService.getUserWord(userId, wordId, token)
      if (userWord?.status === 200) {
        const optional = userWord.data.optional
        optional.totalGuessedSprint = optional.totalGuessedSprint
          ? `${+optional.totalGuessedSprint + 1}`
          : '1'
        await apiService.updateUserWord(userId, wordId, userWord.data, token)
      }
      if (userWord?.status === 404) {
        const body = {
          optional: {
            totalGuessedSprint: '1',
          },
        }
        await apiService.createUserWord(userId, wordId, body, token)
      }
    }
  }

  async addUpdateWord(wordId: string, obj: IUserWord) {
    if (await this.checkUser()) {
      const token = localStorage.getItem('token') as string
      const userId = localStorage.getItem('userId') as string
      const userWord = await apiService.getUserWord(userId, wordId, token)
      if (userWord?.status === 200) {
        await apiService.updateUserWord(userId, wordId, obj, token)
      }
      if (userWord?.status === 404) {
        await apiService.createUserWord(userId, wordId, obj, token)
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
