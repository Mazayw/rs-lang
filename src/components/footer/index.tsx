import styles from './styles.module.scss'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles['footer-wrapper']}>
        <div className={styles['footer-menu']}>
          <li className={styles['footer-menu__item']}>mazayw</li>
          <li className={styles['footer-menu__item']}>niknikolay</li>
          <li className={styles['footer-menu__item']}>rydvone</li>
          <li className={styles['footer-menu__item']}>2022</li>
        </div>
        <img className={styles.rss__img} src='/icons/logo-rsschool3.svg' alt='RS School Logo' />
      </div>
    </footer>
  )
}
export default Footer
