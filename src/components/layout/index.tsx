import styles from './styles.module.scss'
import { NavLink, Outlet } from 'react-router-dom'
import Footer from '../footer'
import Navbar from '../navbar'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from '../../index'

const Layout = observer(
  ({
    setModalActive,
    setAuthType,
  }: {
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>
    setAuthType: React.Dispatch<React.SetStateAction<string>>
  }) => {
    const { user } = useContext(Context)

    const modalHandler = () => {
      setModalActive(true)
      setAuthType('Войти')
    }

    return (
      <>
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
              onClick={modalHandler}
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
