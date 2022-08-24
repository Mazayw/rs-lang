import styles from './styles.module.scss'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles['footer-wrapper']}>
        <div className={styles['footer-menu']}>
          <li>
            <a
              className={styles['footer-menu__item']}
              href='https://github.com/Mazayw'
              target='_blank'
              rel='noopener noreferrer'
            >
              mazayw
            </a>
          </li>
          <li>
            <a
              className={styles['footer-menu__item']}
              href='https://github.com/niknikolay'
              target='_blank'
              rel='noopener noreferrer'
            >
              niknikolay
            </a>
          </li>
          <li>
            <a
              className={styles['footer-menu__item']}
              href='https://github.com/rydvone'
              target='_blank'
              rel='noopener noreferrer'
            >
              rydvone
            </a>
          </li>
          <li className={styles['footer-menu__item']}>2022</li>
        </div>
        <a
          className={styles['footer-menu__item']}
          href='https://rs.school/js/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img className={styles.rss__img} src='/icons/logo-rsschool3.svg' alt='RS School Logo' />
        </a>
      </div>
    </footer>
  )
}
export default Footer
