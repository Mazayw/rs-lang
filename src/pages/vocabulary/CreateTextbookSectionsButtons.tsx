import styles from './styles.module.scss'
import CreateSectionButton from './CreateSectionButton'

const CreateTextbookSectionsButtons = () => {
  const sectionsButtonsText = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'star']

  return (
    <ul className={styles['textbook-sections']}>
      {sectionsButtonsText.map((section, index: number) => (
        <CreateSectionButton key={section} section={section} index={index} />
      ))}
    </ul>
  )
}

export default CreateTextbookSectionsButtons
