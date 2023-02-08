import styles from './styles.module.scss'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from '../../index'
import StarIcon from '../../assets/icons/starIcon'

const CreateSectionButton = observer(({ section, index }: { section: string; index: number }) => {
  const { store, vocabulary } = useContext(Context)

  const onClickSectionButton = () => {
    vocabulary.setPage(0)
    vocabulary.setGroup(index)
  }

  return (
    <li className='textbook-sections__list'>
      <button
        className={`${styles.textbook__link} ${
          index === vocabulary.group && styles['textbook__link_active']
        } ${!store.isAuth && section === 'star' && styles['textbook-games-buttons_none']}`}
        onClick={onClickSectionButton}
      >
        {store.isAuth && section === 'star' ? <StarIcon /> : section}
      </button>
    </li>
  )
})

export default CreateSectionButton
