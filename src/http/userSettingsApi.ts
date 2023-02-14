import { IUserStat, IUserSettings } from '../components/types/interface'
import { authApi } from './http'

export const getUserSettings = async (id: string) => {
  const response = await authApi.get<IUserStat>(`/users/${id}/settings`)
  return response.data
}

export const setUserSettings = async (id: string, body: IUserSettings) => {
  const response = await authApi.put<IUserStat>(`/users/${id}/settings`, body)
  return response
}
