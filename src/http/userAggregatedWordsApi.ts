import { IWord, IUserWord } from '../components/types/interface'
import { authApi } from './http'

export const getAllAggregatedWords = async (
  id: string,
  group = '',
  page = '',
  wordsPerPage = '20',
  filterType = '',
) => {
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

  const response = (await authApi.get(urlStr)).data[0].paginatedResults as IWord[]

  return response
}

export const getAggregatedWord = async (id: string, wordId: string) => {
  const response = await authApi.get<IUserWord>(`/users/${id}/aggregatedWords/${wordId}`)
  return response.data
}
