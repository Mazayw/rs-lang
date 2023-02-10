import helpers from '../components/helpers'
import { IUserWord } from '../components/types/interface'
import { authApi } from './http'

export const getAllUserWords = async () => {
  const response = await authApi.get(`/users/${helpers.getUserId()}/words`)
  return response
}

export const createUserWord = async (wordId: string, body: IUserWord) => {
  const response = await authApi.post<IUserWord>(
    `/users/${helpers.getUserId()}/words/${wordId}`,
    body,
  )
  return response
}

export const getUserWord = async (wordId: string) => {
  const response = await authApi.get<IUserWord>(`/users/${helpers.getUserId()}/words/${wordId}`)
  return response
}

export const updateUserWord = async (wordId: string, body: IUserWord) => {
  const response = await authApi.put<IUserWord>(
    `/users/${helpers.getUserId()}/words/${wordId}`,
    body,
  )
  return response
}

export const deleteUserWord = async (wordId: string) => {
  const response = await authApi.delete<IUserWord>(`/users/${helpers.getUserId()}/words/${wordId}`)
  return response
}
