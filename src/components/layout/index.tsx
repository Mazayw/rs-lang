import styles from './styles.module.scss'
import { NavLink, Outlet } from 'react-router-dom'
import Footer from '../footer'
import Navbar from '../navbar'
import Auth from '../authorization/index'
import helpers from '../helpers'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from '../../index'

const Layout = observer(
  ({
    isModalActive,
    setModalActive,
    authType,
    setAuthType,
  }: {
    isModalActive: boolean
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>
    authType: string
    setAuthType: React.Dispatch<React.SetStateAction<string>>
  }) => {
    const { user } = useContext(Context)

    const headerUserHandler = () => {
      if (user.isAuth) {
        helpers.logaut()
      } else {
        setModalActive(true)
        setAuthType('Войти')
      }
    }

    return (
      <>
        <Auth active={isModalActive} setActive={setModalActive} authType={authType} />
        <header className={styles.header}>
          <div className={styles['header-wrapper']}>
            <NavLink to='/'>
              <img className={styles.logo__img} src='./icons/logo.svg' alt='Logo' />
            </NavLink>
            <div className={styles.menu}>
              <Navbar />
            </div>
            <img
              className={styles.user__img}
              src={user.isAuth ? './icons/exit.svg' : './icons/user.svg'}
              alt={user.isAuth ? 'Exit' : 'Login'}
              onClick={headerUserHandler}
            />
          </div>
        </header>
        <main>
          <Outlet />
        </main>
        <Footer />
      </>
    )
  },
)
export default Layout
