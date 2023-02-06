import styles from './styles.module.scss'
import { useEffect, useState, useContext } from 'react'
import { IUserStat, IGameStat, ITokenData } from '../../components/types/interface'
import { observer } from 'mobx-react-lite'
import { Context } from '../../index'
import jwtDecode from 'jwt-decode'
import { getUserStatistic, setUserStatistic } from '../../http/userStatisticApi'
import { AxiosError } from 'axios'

const Statistics = observer(() => {
  const [dayStat, setDayStat] = useState({} as unknown as IUserStat)
  const [gameStat, setGameStat] = useState({} as IGameStat)
  // const [isNoStat, setIsNoStat] = useState(false)
  const { store } = useContext(Context)

  const createStat = async () => {
    const token = localStorage.getItem('token') || ''
    const userData: ITokenData = jwtDecode(token)

    try {
      await setUserStatistic(userData.id, {
        learnedWords: 0,
        optional: {},
      })
    } catch (error) {
      console.log(error)
    }
  }

  const getStat = async () => {
    const token = localStorage.getItem('token') || ''
    const userData: ITokenData = jwtDecode(token)
    store.setIsLoading(true)

    try {
      const stat = await getUserStatistic(userData.id)
      setDayStat(stat.data)
    } catch (error) {
      const err = error as AxiosError
      if (err.response?.status === 404) createStat()
      console.log(error)
    } finally {
      store.setIsLoading(false)
    }
  }

  const updateStatText = (key: string) => {
    const date = new Date().toDateString()
    if (typeof dayStat.learnedWords !== 'undefined') {
      if (typeof dayStat.optional[date] === 'undefined') {
        return 0
      }
      const dateObj = dayStat.optional[date] as IGameStat
      if (typeof dateObj[key] === 'undefined') return 0
      return dateObj[key] as number
    } else return 0
  }

  const getStatText = () => {
    const res = {
      sprintNewWords: updateStatText('sprintNewWords'),
      sprintShareGuessed: Math.round(updateStatText('sprintShareGuessed')),
      sprintLongestseries: updateStatText('sprintLongestseries'),
      audioNewWords: updateStatText('audioNewWords'),
      audioShareGuessed: Math.round(updateStatText('audioShareGuessed')),
      audioLongestseries: updateStatText('audioLongestseries'),
    }
    setGameStat(res)
    return res
  }

  const date = new Date()

  useEffect(() => {
    store.isAuth && getStatText()
  }, [dayStat])

  useEffect(() => {
    getStat()
    getStatText()
  }, [])
  /*
  useEffect(() => {
    getStat()
    console.log('fire!')
  }, [store.isAuth])*/

  return (
    <div className={styles.main}>
      {store.isAuth ? (
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
})

export default Statistics
