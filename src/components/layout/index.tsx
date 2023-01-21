import styles from './styles.module.scss'
import { NavLink, Outlet } from 'react-router-dom'
import Footer from '../footer'
import Navbar from '../navbar'
import Auth from '../authorization/index'
import helpers from '../helpers'
import { useEffect } from 'react'

function Layout({
  isModalActive,
  setModalActive,
  setIsAuthorized,
  authType,
  setAuthType,
  isAuthorized,
}: {
  isModalActive: boolean
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>
  setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>
  authType: string
  setAuthType: React.Dispatch<React.SetStateAction<string>>
  isAuthorized: boolean
}) {
  useEffect(() => {
    const isAuth = helpers.checkUserLocal()
    setIsAuthorized(isAuth)
  }, [])

  const headerUserHandler = () => {
    if (isAuthorized) {
      helpers.logaut()
      setIsAuthorized(false)
    } else {
      setModalActive(true)
      setAuthType('Войти')
    }
  }

  return (
    <>
      <Auth
        active={isModalActive}
        setActive={setModalActive}
        setIsAuthorized={setIsAuthorized}
        authType={authType}
      />
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
            src={isAuthorized ? './icons/exit.svg' : './icons/user.svg'}
            alt={isAuthorized ? 'Exit' : 'Login'}
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
}
export default Layout
