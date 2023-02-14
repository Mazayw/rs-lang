import styles from './styles.module.scss'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from '../../index'
import { VOCABULARY_SETTINGS } from '../../settings'
import NextPageButton from '../../assets/icons/nextPageButton'
import PrevPageButton from '../../assets/icons/prevPageButton'

const TextbookPagesButtons = observer(() => {
  const { vocabulary } = useContext(Context)

  return (
    <div className={styles['page-buttons']}>
      <button
        className={styles['page-buttons__arrow-left']}
        disabled={vocabulary.page <= 0}
        onClick={() => vocabulary.setPage(vocabulary.page - 1)}
      >
        <PrevPageButton
          fill={
            vocabulary.page <= 0
              ? VOCABULARY_SETTINGS.BUTTON_DISABLED_COLOR
              : VOCABULARY_SETTINGS.BUTTON_ACTIVE_COLOR
          }
        />
      </button>
      <p className={`${styles['page-buttons__page']} `}>{vocabulary.page + 1}</p>
      <button
        className={styles['page-buttons__arrow-right']}
        disabled={vocabulary.page + 1 >= vocabulary.maxPagesCount}
        onClick={() => vocabulary.setPage(vocabulary.page + 1)}
      >
        <NextPageButton
          fill={
            vocabulary.page + 1 === vocabulary.maxPagesCount
              ? VOCABULARY_SETTINGS.BUTTON_DISABLED_COLOR
              : VOCABULARY_SETTINGS.BUTTON_ACTIVE_COLOR
          }
        />
      </button>
    </div>
  )
})

export default TextbookPagesButtons
