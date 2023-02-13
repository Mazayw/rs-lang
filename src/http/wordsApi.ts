import { IWord } from '../components/types/interface'
import { api } from './http'

export const getAllWords = async (group = '0', page = '0') => {
  const data = await api.get<Array<IWord>>(`/words?group=${group}&page=${page}`)

  return { data, itemsCount: 600 }
}

export const getWord = async (id: string) => {
  const response = await api.get<IWord>(`/words/${id}`)
  return response.data
}
