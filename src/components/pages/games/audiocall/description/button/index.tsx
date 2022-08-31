import styles from './styles.module.scss'
import { IButton, IWord } from '../../../../../types/interface'
import { Link } from 'react-router-dom'

function ChooseButton({ data }: { data: IButton }) {
  const page = `${Math.floor(Math.random() * 30)}`

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
