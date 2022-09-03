import styles from './styles.module.scss';

export function CreateSectionButton({ section, index, buttonSectionCurrentIndex, onClickSectionButton }: { section: string, index: number, buttonSectionCurrentIndex: number, onClickSectionButton: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => void }) {
  return (
    <li key={section} className="textbook-sections__list">
      <button className={`${styles.textbook__link} ${index === buttonSectionCurrentIndex ? styles['textbook__link_active'] : ''}`} onClick={(e) => onClickSectionButton(e, index)}>{section}</button>
    </li>
  )
}