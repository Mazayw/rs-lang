import styles from './styles.module.scss'
import { INDEX_STAR_SECTION_BUTTON } from '.'
import { IWord } from '../../components/types/interface'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from '../../index'
import { SETTINGS, VOCABULARY_SETTINGS } from '../../settings'
import NextPageButton from '../../assets/icons/nextPageButton'
import PrevPageButton from '../../assets/icons/prevPageButton'

const TextbookPagesButtons = observer(
  ({
    buttonSectionCurrentIndex,
    check20WordsInPage,
  }: {
    buttonSectionCurrentIndex: number
    check20WordsInPage: IWord[]
  }) => {
    const { vocabulary } = useContext(Context)

    const page = {
      disabled: '#1F2143',
      active: 'rgba(255, 255, 255, 0.3)',
    }

    return (
      <div
        className={
          INDEX_STAR_SECTION_BUTTON === buttonSectionCurrentIndex
            ? styles['page-buttons_none']
            : styles['page-buttons']
        }
      >
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
        <p
          className={`${styles['page-buttons__page']} ${
            check20WordsInPage.length === 20 ? styles['page-buttons__page_active'] : page.disabled
          }`}
        >
          {vocabulary.page + 1}
        </p>
        <button
          className={styles['page-buttons__arrow-right']}
          disabled={vocabulary.page + 1 === SETTINGS.MAX_PAGE}
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
  },
)

export default TextbookPagesButtons
