import styles from './styles.module.scss'
import { NavLink, Outlet } from 'react-router-dom'
import Footer from '../footer'
import Navbar from '../navbar'
import Auth from '../authorization/index'
import { useState } from 'react'
import { IWord } from '../types/interface'

function Layout({
  isModalActive,
  setModalActive,
  setIsAuthorized,
  authType,
  setAuthType,
  check20WordsInPage,
  setCheck20WordsInPage,
}: {
  isModalActive: boolean
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>
  setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>
  authType: string
  setAuthType: React.Dispatch<React.SetStateAction<string>>
  check20WordsInPage: IWord[]
  setCheck20WordsInPage: React.Dispatch<React.SetStateAction<IWord[]>>
}) {
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
            <Navbar check20WordsInPage={check20WordsInPage} setCheck20WordsInPage={setCheck20WordsInPage} />
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
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
export default Layout
