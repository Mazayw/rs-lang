import { IWord } from '../components/types/interface'
import { api } from './http'

export const getAllWords = async (group = '0', page = '0') => {
  const response = await api.get<Array<IWord>>(`/words?group=${group}&page=${page}`)
  return response.data
}

export const getWord = async (id: string) => {
  const response = await api.get<IWord>(`/words/${id}`)
  return response.data
}
