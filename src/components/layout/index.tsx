import styles from './styles.module.scss'
import { NavLink, Outlet } from 'react-router-dom'
import Footer from '../footer'
import Navbar from '../navbar'
import Auth from '../authorization/index'
import { useState } from 'react'

function Layout() {
  const [isModalActive, setModalActive] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [authType, setAuthType] = useState('')
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
            <img className={styles.logo__img} src='/icons/logo.svg' alt='Logo' />
          </NavLink>
          <div className={styles.menu}>
            <Navbar />
          </div>
          <img
            className={styles.user__img}
            src='/icons/user.svg'
            alt='Logo'
            onClick={() => {
              setModalActive(true)
              setAuthType('Регистрация')
            }}
          />
        </div>
      </header>
      <Outlet />
      <Footer />
    </>
  )
}
export default Layout
