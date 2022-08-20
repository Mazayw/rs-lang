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
} from '../types/interface'
import { AxiosError } from 'axios'

class ApiService {
  errorHandler(error: AxiosError) {
    if (error.response) {
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    } else if (error.request) {
      console.log(error.request)
    } else {
      console.log('Error', error.message)
    }
    console.log(error.config)
  }

  header(token = '') {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  }

  //Words
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

  //Users
  async createUser(obj: IUser) {
    try {
      await http.post<IUser>('/users', obj)
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
      return response.data
    } catch (error) {
      this.errorHandler(error as AxiosError)
    }
  }

  //Users/Words
  async getAllUserWords(id: string, token: string) {
    try {
      const response = await http.get<Array<IUserWord>>(`/users/${id}/words`, this.header(token))
      return response.data
    } catch (error) {
      this.errorHandler(error as AxiosError)
    }
  }

  async createUserWord(id: string, wordId: string, body: IUserWord, token: string) {
    try {
      await http.post<IUserWord>(`/users/${id}/words/${wordId}`, body, this.header(token))
    } catch (error) {
      this.errorHandler(error as AxiosError)
    }
  }

  async getUserWord(id: string, wordId: string, token: string) {
    try {
      const response = await http.get<IUserWord>(`/users/${id}/words/${wordId}`, this.header(token))
      return response.data
    } catch (error) {
      this.errorHandler(error as AxiosError)
    }
  }

  async updateUserWord(id: string, wordId: string, body: IUserWord, token: string) {
    try {
      await http.put<IUserWord>(`/users/${id}/words/${wordId}`, body, this.header(token))
    } catch (error) {
      this.errorHandler(error as AxiosError)
    }
  }

  async deleteUserWord(id: string, wordId: string, token: string) {
    try {
      await http.delete<IUserWord>(`/users/${id}/words/${wordId}`, this.header(token))
    } catch (error) {
      this.errorHandler(error as AxiosError)
    }
  }

  //Users/AggregatedWords

  async getAllAgregatedWords(
    id: string,
    group = '0',
    page = '0',
    wordsPerPage = '20',
    token: string,
  ) {
    try {
      const response = await http.get<IUserWord>(
        `/users/${id}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=${wordsPerPage}`,
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

  //Users/Statistic
  async getUserStatistic(id: string, token: string) {
    try {
      const response = await http.get<IUserStat>(`/users/${id}/statistics`, this.header(token))
      return response.data
    } catch (error) {
      this.errorHandler(error as AxiosError)
    }
  }

  async setUserStatistic(id: string, obj: IUserStat, token: string) {
    try {
      await http.put<IUserStat>(`/users/${id}/statistics`, obj, this.header(token))
    } catch (error) {
      this.errorHandler(error as AxiosError)
    }
  }

  //Users/Setting
  async getUserSettings(id: string, token: string) {
    try {
      const response = await http.get<IUserStat>(`/users/${id}/settings`, this.header(token))
      return response.data
    } catch (error) {
      this.errorHandler(error as AxiosError)
    }
  }

  async setUserSettings(id: string, obj: IUserSettings, token: string) {
    try {
      await http.put<IUserStat>(`/users/${id}/settings`, obj, this.header(token))
    } catch (error) {
      this.errorHandler(error as AxiosError)
    }
  }

  //Sign In
  async signIn(obj: IUserSignIn, token: string) {
    try {
      const response = await http.post<IUserSignInResponse>(`/signin`, obj, this.header(token))
      return response.data
    } catch (error) {
      this.errorHandler(error as AxiosError)
    }
  }
}

export default new ApiService()
