import jwtDecode from 'jwt-decode'
import axios from 'axios'
import { IToken, ITokenData } from '../components/types/interface'
import { SETTINGS } from '../settings'

export const api = axios.create({
  baseURL: SETTINGS.BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
})

export const authApi = axios.create({
  baseURL: SETTINGS.BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
})

authApi.interceptors.request.use((config) => {
  config.headers = config.headers ?? {}
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

authApi.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        const token = localStorage.getItem('refreshToken') || ''
        const userId: ITokenData = jwtDecode(token)
        const response = await axios.get<IToken>(`${SETTINGS.BASE_URL}/users/${userId.id}/tokens`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('refreshToken', response.data.refreshToken)
        return api.request(originalRequest)
      } catch (e) {
        console.log('НЕ АВТОРИЗОВАН')
      }
    }
    console.log('error')
    throw error
  },
)
