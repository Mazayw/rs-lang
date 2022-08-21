import styles from './styles.module.scss'
// @ts-ignore: Unreachable code error
function Header({ setActive }) {
  return (
    <header className={styles.header}>
      <div className={styles['header-wrapper']}>
        <img className={styles.logo__img} src='/icons/logo.svg' alt='Logo' />
        <ul className={styles.menu}>
          <li className={(styles.menu__item, styles['item-active'])}>Главная</li>
          <li className={styles.menu__item}>Учебник</li>
          <li className={styles.menu__item}>Мини-игры</li>
          <li className={styles.menu__item}>О команде</li>
          <li className={styles.menu__item}>Мой прогресс</li>
        </ul>
        <img
          className={styles.user__img}
          src='/icons/user.svg'
          alt='User'
          onClick={() => setActive(true)}
        />
      </div>
    </header>
  )
}
export default Header
