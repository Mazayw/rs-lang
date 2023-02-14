import { IUserStat } from '../components/types/interface'
import { authApi } from './http'

export const getUserStatistic = async (id: string) => {
  const response = await authApi.get(`/users/${id}/statistics`)
  return response
}

export const setUserStatistic = async (id: string, body: IUserStat) => {
  const response = await authApi.put<IUserStat>(`/users/${id}/statistics`, body)
  return response
}
