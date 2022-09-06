import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import apiService from '../../api/api-service'
import helpers from '../../helpers'
import { AxiosResponse } from 'axios'
import { IUserStat, IGameStat } from '../../types/interface'

function Statistics({
  isAuthorized,
  setIsAuthorized,
}: {
  isAuthorized: boolean
  setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [dayStat, setDayStat] = useState({} as unknown as IUserStat)
  const [gameStat, setGameStat] = useState({} as IGameStat)

  const auth = async () => {
    const isUserAuth = await helpers.checkUser()
    setIsAuthorized(isUserAuth)
  }

  const getStat = async () => {
    const token = localStorage.getItem('token') as string
    const userId = localStorage.getItem('userId') as string
    const stat = (await apiService.getUserStatistic(userId, token)) as AxiosResponse
    console.log(stat.data)
    stat.status === 200 && setDayStat(stat.data)
  }

  const updateStatText = (key: string) => {
    const date = new Date().toDateString()
    if (typeof dayStat.learnedWords !== 'undefined') {
      if (typeof dayStat.optional[date] === 'undefined') {
        return 0
      } else {
        const dateObj = dayStat.optional[date] as IGameStat
        return dateObj[key] as number
      }
    } else return 0
  }

  const getSatText = () => {
    const res = {
      sprintNewWords: updateStatText('sprintNewWords'),
      sprintShareGuessed: Math.round(updateStatText('sprintShareGuessed')),
      sprintLongestseries: updateStatText('sprintLongestseries'),
      audioNewWords: updateStatText('audioNewWords'),
      audioShareGuessed: Math.round(updateStatText('audioShareGuessed')),
      audioLongestseries: updateStatText('audioLongestseries'),
    }
    console.log(res)
    setGameStat(res)
    return res
  }

  const date = new Date()

  useEffect(() => {
    getSatText()
  }, [dayStat])

  useEffect(() => {
    auth()
    getSatText()
  }, [])

  useEffect(() => {
    getStat()
  }, [isAuthorized])

  return (
    <div className={styles.main}>
      {isAuthorized ? (
        <>
          <h1 className={styles.title}>Статистика</h1>
          <h3 className={styles['subtitle-stat']}>
            Дневная статистика за {`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`}
          </h3>
          <h5 className={styles.subtitle}>
            Новые слова за все время - {dayStat.learnedWords || 0}
          </h5>
          <h5 className={styles.subtitle}>
            Новые слова за сегодня -{' '}
            {`${
              ((gameStat.audioNewWords as number) || 0) + ((gameStat.sprintNewWords as number) || 0)
            }`}
          </h5>
          <div className={styles['games-wrapper']}>
            <div className={styles['game-stat']}>
              <h2 className={styles['game-title']}>Аудиовызов</h2>
              <h5 className={styles.subtitle}>Новых слов - {`${gameStat.audioNewWords}`}</h5>
              <h5 className={styles.subtitle}>
                Правильные ответы - {`${gameStat.audioShareGuessed}`}%
              </h5>
              <h5 className={styles.subtitle}>
                Серия правильных ответов - {`${gameStat.audioLongestseries}`}
              </h5>
            </div>
            <div className={styles['game-stat']}>
              <h2 className={styles['game-title']}>Спринт</h2>
              <h5 className={styles.subtitle}>Новых слов - {`${gameStat.sprintNewWords}`}</h5>
              <h5 className={styles.subtitle}>
                Правильные ответы - {`${gameStat.sprintShareGuessed}`}%
              </h5>
              <h5 className={styles.subtitle}>
                Серия правильных ответов - {`${gameStat.sprintLongestseries}`}
              </h5>
            </div>
          </div>
        </>
      ) : (
        <>
          <h3 className={styles['subtitle-stat']}>
            Просмотр статистики доступен только для зарегистрированных пользователей
          </h3>
          <h3 className={styles['subtitle-stat']}>Пожалуйста, войдите или зарегистрируйтесь</h3>
        </>
      )}
    </div>
  )
}
export default Statistics
