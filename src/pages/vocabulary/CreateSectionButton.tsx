import styles from './styles.module.scss'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from '../../index'

const CreateSectionButton = observer(({ section, index }: { section: string; index: number }) => {
  const { vocabulary } = useContext(Context)

  const onClickSectionButton = () => {
    vocabulary.setPage(0)
    vocabulary.setGroup(index)
  }

  return (
    <li className='textbook-sections__list'>
      <button
        className={`${styles.textbook__link} ${
          index === vocabulary.group ? styles['textbook__link_active'] : ''
        }`}
        onClick={onClickSectionButton}
      >
        {section}
      </button>
    </li>
  )
})

export default CreateSectionButton
