import styles from './styles.module.scss'
import { NavLink } from 'react-router-dom'

function NotFound() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>404</h1>
      <h1 className={styles.subtitle}>Страница не найдена</h1>
      <NavLink to={'/'} className={styles.subtitle}>
        вернутся на главную
      </NavLink>
    </main>
  )
}
export default NotFound
