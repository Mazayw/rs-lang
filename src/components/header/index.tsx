import styles from './styles.module.scss'

function Header({
  setActive,
  setAuthType,
}: {
  setActive: React.Dispatch<React.SetStateAction<boolean>>

  setAuthType: React.Dispatch<React.SetStateAction<string>>
}) {
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
          onClick={() => {
            setActive(true)
            setAuthType('Регистрация')
          }}
        />
      </div>
    </header>
  )
}
export default Header
