import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import { IButton } from '../../../../../types/audioGame-interface'
import { useEffect } from 'react'

function ChooseButton({ data, index }: { data: IButton; index: number }) {
  const page = `${Math.floor(Math.random() * 30)}`

  const moveTopage = () => {
    window.location.assign(`audiocall/${data.group}/${page}`)
  }

  useEffect(() => {
    const onKeypress = (e: KeyboardEvent) => {
      if (e.key === `${index + 1}`) {
        moveTopage()
      }
    }
    document.addEventListener('keypress', onKeypress)
    return () => {
      document.removeEventListener('keypress', onKeypress)
    }
  }, [])

  return (
    <Link className={styles.link} to={`${data.group}/${page}`}>
      <button
        type='button'
        className={`${styles['choose-button']} ${styles[`button-${data.name}`]}`}
      >
        <h5>{data.name}</h5>
      </button>
    </Link>
  )
}
export default ChooseButton
