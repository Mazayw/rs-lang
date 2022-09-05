import styles from './styles.module.scss'

function MainPage({
  setActive,
  setAuthType,
}: {
  setActive: React.Dispatch<React.SetStateAction<boolean>>
  setAuthType: React.Dispatch<React.SetStateAction<string>>
}) {
  return (
    <div className={styles.main}>
      <img src={'./img/hero-img.png'} alt='Girl with books' className={styles['hero-img']} />
      <div className={styles.info}>
        <div className={styles['text-block']}>
          <h1 className={styles.title}>Изучай английский язык вместе с RsLang!</h1>
          <h3 className={styles.subtitle}>
            Бесплатный, веселый и эффективный способ выучить язык! Играйте в мини-игры, изучайте
            новые слова и повторяйте их до закрепления результата!
          </h3>
        </div>
        <div className={styles['buttons-block']}>
          <button
            type='button'
            className={`${styles.button} ${styles.regbtn}`}
            onClick={() => {
              setActive(true)
              setAuthType('Регистрация')
            }}
          >
            регистрация
          </button>
          <button
            type='button'
            className={`${styles.button} ${styles.authbtn}`}
            onClick={() => {
              setActive(true)
              setAuthType('Войти')
            }}
          >
            войти
          </button>
        </div>
      </div>
    </div>
  )
}
export default MainPage
