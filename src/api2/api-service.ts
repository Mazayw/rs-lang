import http from './http-common'
import {
  IWord,
  IUser,
  IToken,
  IUserWord,
  IUserStat,
  IUserSettings,
  IUserSignIn,
  IUserSignInResponse,
} from '../components/types/interface'
import { AxiosError } from 'axios'
import { SETTINGS } from '../settings'

class ApiService {
  private errorHandler(error: AxiosError) {
    if (error.response) {
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
      return error.response.status
    } else if (error.request) {
      console.log(error.request)
      return error.request
    } else {
      console.log('Error', error.message)
    }
    console.log(error.config)
  }

  private header(token = '') {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    }
  }

  // Words

  async getAllWords(group = '0', page = '0') {
    try {
      const response = await http.get<Array<IWord>>(`/words?group=${group}&page=${page}`)
      return response.data
    } catch (error) {
      this.errorHandler(error as AxiosError)
    }
  }

  async getWord(id: string) {
    try {
      const response = await http.get<IWord>(`/words/${id}`)
      return response.data
    } catch (error) {
      this.errorHandler(error as AxiosError)
    }
  }

  // Users

  async createUser(obj: IUser) {
    try {
      const response = await http.post<IUser>('/users', obj)
      return response
    } catch (error) {
      this.errorHandler(error as AxiosError)
    }
  }

  async getUser(id: string, token: string) {
    try {
      const response = await http.get<IUser>(`/users/${id}`, this.header(token))
      return response.data
    } catch (error) {
      this.errorHandler(error as AxiosError)
    }
  }

  async updateUser(obj: IUser, id: string, token: string) {
    try {
      await http.put<IUser>(`/users/${id}`, obj, this.header(token))
    } catch (error) {
      this.errorHandler(error as AxiosError)
    }
  }

  async deleteUser(id: string, token: string) {
    try {
      await http.delete<IUser>(`/users/${id}`, this.header(token))
    } catch (error) {
      this.errorHandler(error as AxiosError)
    }
  }

  async getUserToken(id: string, token: string) {
    try {
      const response = await http.get<IToken>(`/users/${id}/tokens`, this.header(token))
      return response
    } catch (error) {
      this.errorHandler(error as AxiosError)
    }
  }

  // Users/Words

  async getAllUserWords(id: string, token: string) {
    try {
      const response = await http.get(`/users/${id}/words`, this.header(token))
      return response
    } catch (error) {
      this.errorHandler(error as AxiosError)
    }
  }

  async createUserWord(id: string, wordId: string, body: IUserWord, token: string) {
    try {
      const response = await http.post<IUserWord>(
        `/users/${id}/words/${wordId}`,
        body,
        this.header(token),
      )
      return response
    } catch (error) {
      this.errorHandler(error as AxiosError)
    }
  }

  async getUserWord(id: string, wordId: string, token: string) {
    try {
      const response = await http.get<IUserWord>(`/users/${id}/words/${wordId}`, this.header(token))
      return response
    } catch (error) {
      return this.errorHandler(error as AxiosError)
    }
  }

  async updateUserWord(id: string, wordId: string, body: IUserWord, token: string) {
    try {
      const response = await http.put<IUserWord>(
        `/users/${id}/words/${wordId}`,
        body,
        this.header(token),
      )
      return response
    } catch (error) {
      this.errorHandler(error as AxiosError)
    }
  }

  async deleteUserWord(id: string, wordId: string, token: string) {
    try {
      const response = await http.delete<IUserWord>(
        `/users/${id}/words/${wordId}`,
        this.header(token),
      )
      return response
    } catch (error) {
      this.errorHandler(error as AxiosError)
    }
  }

  // Users/AggregatedWords

  async getAllAgregatedWords(
    id: string,
    token: string,
    group = '',
    page = '',
    wordsPerPage = SETTINGS.CARDS_PER_PAGE.toString(),
    filterType = '',
  ) {
    switch (filterType) {
      case 'easyOrUnknown':
        filterType = '{"$or":[{"userWord.difficulty":"easy"},{"userWord":null}]}'
        break

      case 'hard':
        filterType = '{"userWord.difficulty":"hard"}'
        break

      case 'unknownOrUnlearned':
        filterType = '{"$or":[{"userWord":null},{"userWord.optional.isStudied":false}]}'
        break
    }

    const url: string[] = []
    url.push(`/users/${id}/aggregatedWords?`)
    group && url.push(`group=${group}`)
    page && url.push(`page=${page}`)
    wordsPerPage && url.push(`wordsPerPage=${wordsPerPage}`)
    filterType && url.push(`filter=${filterType}`)

    const urlStr = url.join('&').replace('&', '')

    try {
      const response = (await http.get(urlStr, this.header(token))).data[0]
        .paginatedResults as IWord[]

      console.log(response)
      return response
    } catch (error) {
      this.errorHandler(error as AxiosError)
    }
  }

  async getAllAgregatedWordsFilterHard(id: string, wordsPerPage = '3600', token: string) {
    try {
      const response = await http.get<
        [{ paginatedResults: IWord[]; totalCount: [{ count: number }] }]
      >(
        `/users/${id}/aggregatedWords?wordsPerPage=${wordsPerPage}&filter={"userWord.difficulty":"hard"}`,
        this.header(token),
      )
      return response.data
    } catch (error) {
      this.errorHandler(error as AxiosError)
    }
  }

  async getAgregatedWord(id: string, wordId: string, token: string) {
    try {
      const response = await http.get<IUserWord>(
        `/users/${id}/aggregatedWords/${wordId}`,
        this.header(token),
      )
      return response.data
    } catch (error) {
      this.errorHandler(error as AxiosError)
    }
  }

  // Users/Statistic

  async getUserStatistic(id: string, token: string) {
    try {
      const response = await http.get(`/users/${id}/statistics`, this.header(token))
      return response
    } catch (error) {
      this.errorHandler(error as AxiosError)
    }
  }

  async setUserStatistic(id: string, obj: IUserStat, token: string) {
    try {
      const response = await http.put<IUserStat>(`/users/${id}/statistics`, obj, this.header(token))
      return response
    } catch (error) {
      this.errorHandler(error as AxiosError)
    }
  }

  // Users/Setting

  async getUserSettings(id: string, token: string) {
    try {
      const response = await http.get<IUserStat>(`/users/${id}/settings`, this.header(token))
      return response.data
    } catch (error) {
      return this.errorHandler(error as AxiosError)
    }
  }

  async setUserSettings(id: string, obj: IUserSettings, token: string) {
    try {
      await http.put<IUserStat>(`/users/${id}/settings`, obj, this.header(token))
    } catch (error) {
      this.errorHandler(error as AxiosError)
    }
  }

  // Sign In

  async signIn(obj: IUserSignIn) {
    try {
      const response = await http.post<IUserSignInResponse>('/signin', obj)
      return response
    } catch (error) {
      this.errorHandler(error as AxiosError)
    }
  }
}

export default new ApiService()
