import { api, authApi } from './http'
import { IUser, IToken, IUserSignIn, IUserSignInResponse } from '../components/types/interface'

import helpers from '../components/helpers'

export const createUser = async (body: IUser) => {
  const response = await api.post<IUser>('/users', body)
  return response.data
}

export const getUser = async () => {
  const response = await authApi.get<IUser>(`/users/${helpers.getUserId()}`)
  return response.data
}

export const updateUser = async (body: IUser) => {
  const response = await authApi.put<IUser>(`/users/${helpers.getUserId()}`, body)
  return response
}

export const deleteUser = async () => {
  const response = await authApi.delete<IUser>(`/users/${helpers.getUserId()}`)
  return response
}

export const getUserToken = async () => {
  const token = localStorage.getItem('refreshToken') || ''
  if (token) {
    const response = await api.get<IToken>(`/users/${helpers.getUserId()}/tokens`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('refreshToken', response.data.refreshToken)
    localStorage.setItem('userId', helpers.getUserId())

    return response
  }
  localStorage.clear()
}

export const signIn = async (body: IUserSignIn) => {
  const response = await api.post<IUserSignInResponse>('/signin', body)
  localStorage.setItem('token', response.data.token)
  localStorage.setItem('refreshToken', response.data.refreshToken)
  localStorage.setItem('userId', response.data.userId)

  return response
}
