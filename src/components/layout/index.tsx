import styles from './styles.module.scss'
import { Outlet } from 'react-router-dom'
import Footer from '../footer'

import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from '../navbar'

function Layout() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles['header-wrapper']}>
          <img className={styles.logo__img} src='/icons/logo.svg' alt='Logo' />
          <div className={styles.menu}>
            <Navbar />
          </div>
          <img className={styles.user__img} src='/icons/user.svg' alt='Logo' />
        </div>
      </header>
      <Outlet />
      <Footer />
    </>
  )
}
export default Layout
