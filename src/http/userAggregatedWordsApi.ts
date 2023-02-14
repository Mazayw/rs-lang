import { IUserWord } from '../components/types/interface'
import { authApi } from './http'

const userId = localStorage.getItem('userId') || ''

export const getAllAggregatedWords = async (params: { [key: string]: string }) => {
  const url = `/users/${userId}/aggregatedWords?`

  const urlQuery = new URLSearchParams(params).toString()

  const response = await authApi.get(url + urlQuery)
  const itemsCount = response.data[0].totalCount[0].count
  const data = response?.data[0].paginatedResults

  return { data, itemsCount }
}

export const getAggregatedWord = async (wordId: string) => {
  const response = await authApi.get<IUserWord>(`/users/${userId}/aggregatedWords/${wordId}`)
  return response.data
}
