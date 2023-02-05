import { IUserWord } from '../components/types/interface'
import { authApi } from './http'

export const getAllUserWords = async (id: string) => {
  const response = await authApi.get(`/users/${id}/words`)
  return response
}

export const createUserWord = async (id: string, wordId: string, body: IUserWord) => {
  const response = await authApi.post<IUserWord>(`/users/${id}/words/${wordId}`, body)
  return response
}

export const getUserWord = async (id: string, wordId: string) => {
  const response = await authApi.get<IUserWord>(`/users/${id}/words/${wordId}`)
  return response
}

export const updateUserWord = async (id: string, wordId: string, body: IUserWord) => {
  const response = await authApi.put<IUserWord>(`/users/${id}/words/${wordId}`, body)
  return response
}

export const deleteUserWord = async (id: string, wordId: string) => {
  const response = await authApi.delete<IUserWord>(`/users/${id}/words/${wordId}`)
  return response
}
