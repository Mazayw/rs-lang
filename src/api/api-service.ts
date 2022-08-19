import http from './http-common'
import { IWord, IUser } from '../types/interface'
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

  async getAllWords(group: number, page: number) {
    try {
      const response = await http.get<Array<IWord>>(`/words?group=${group}&page=${page}`)
      return response.data
    } catch (error) {
      this.errorHandler(error as AxiosError)
    }
  }

  async getWord(id: number) {
    try {
      const response = await http.get<IWord>(`/words/${id}`)
      return response.data
    } catch (error) {
      this.errorHandler(error as AxiosError)
    }
  }

  async createUser(obj: IUser) {
    try {
      const response = await http.post<IWord>(`/users`, obj)
      return response.data
    } catch (error) {
      this.errorHandler(error as AxiosError)
    }
  }
}

export default new ApiService()
