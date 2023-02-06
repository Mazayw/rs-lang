import { api, authApi } from './http'
import {
  IUser,
  IToken,
  IUserSignIn,
  IUserSignInResponse,
  ITokenData,
} from '../components/types/interface'
import jwtDecode from 'jwt-decode'

export const createUser = async (body: IUser) => {
  const response = await api.post<IUser>('/users', body)
  return response.data
}

export const getUser = async (id: string) => {
  const response = await authApi.get<IUser>(`/users/${id}`)
  return response.data
}

export const updateUser = async (body: IUser, id: string) => {
  const response = await authApi.put<IUser>(`/users/${id}`, body)
  return response
}

export const deleteUser = async (id: string) => {
  const response = await authApi.delete<IUser>(`/users/${id}`)
  return response
}

export const getUserToken = async () => {
  const token = localStorage.getItem('refreshToken') || ''
  if (token) {
    const userData: ITokenData = jwtDecode(token)

    const response = await api.get<IToken>(`/users/${userData.id}/tokens`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('refreshToken', response.data.refreshToken)
    return response
  }
}

export const signIn = async (body: IUserSignIn) => {
  const response = await api.post<IUserSignInResponse>('/signin', body)
  localStorage.setItem('token', response.data.token)
  localStorage.setItem('refreshToken', response.data.refreshToken)
  return response
}
