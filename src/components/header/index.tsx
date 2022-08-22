import styles from './styles.module.scss'
import { Link, Outlet } from 'react-router-dom'
import Footer from '../footer'

function Header({
  setActive,
  setAuthType,
}: {
  setActive: React.Dispatch<React.SetStateAction<boolean>>

  setAuthType: React.Dispatch<React.SetStateAction<string>>
}) {
  return (
    <>
      <header className={styles.header}>
        <div className={styles['header-wrapper']}>
          <img className={styles.logo__img} src='/icons/logo.svg' alt='Logo' />
          <ul className={styles.menu}>
            <Link to='/'>
              <li className={(styles.menu__item, styles['item-active'])}>Главная</li>
            </Link>
            <Link to='/vocabulary'>
              <li className={styles.menu__item}>Учебник</li>
            </Link>
            <Link to='/'>
              <li className={styles.menu__item}>Мини-игры</li>
            </Link>
            <Link to='/about'>
              <li className={styles.menu__item}>О команде</li>
            </Link>
            <Link to='/statistics'>
              <li className={styles.menu__item}>Мой прогресс</li>
            </Link>
          </ul>
          <img
            className={styles.user__img}
            src='/icons/user.svg'
            alt='User'
            onClick={() => {
              setActive(true)
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
export default Header
