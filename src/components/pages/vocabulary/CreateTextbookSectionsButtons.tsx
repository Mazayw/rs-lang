import styles from './styles.module.scss';
import { CreateSectionButton } from './CreateSectionButton';
import { INDEX_STAR_SECTION_BUTTON } from '.';

export function CreateTextbookSectionsButtons({ sections, buttonSectionCurrentIndex, onClickSectionButton, onClickSectionHardButton }: { sections: string[], buttonSectionCurrentIndex: number, onClickSectionButton: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => void, onClickSectionHardButton: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void }) {
  return (
    <ul className={styles['textbook-sections']}>
      {sections.map((section, index: number) =>
        <CreateSectionButton key={section} section={section} index={index} buttonSectionCurrentIndex={buttonSectionCurrentIndex} onClickSectionButton={onClickSectionButton} />
      )}
      <li className={styles['textbook-sections__list']}>
        <button className={`${styles.textbook__link} ${INDEX_STAR_SECTION_BUTTON === buttonSectionCurrentIndex ? styles['textbook__link_active'] : ''}`} onClick={onClickSectionHardButton}>
          <svg width="40" height="39" viewBox="0 0 40 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.0344 1.52785C18.3211 0.829617 18.9992 0.306529 19.7523 0.226776C20.4945 0.132948 21.2703 0.468381 21.7078 1.07513C21.9797 1.4567 22.1164 1.91098 22.3109 2.3332C23.7156 5.62029 25.1148 8.90893 26.5234 12.1945C30.3156 12.5346 34.1078 12.8802 37.9 13.2281C38.2648 13.2547 38.632 13.3376 38.9477 13.5292C39.5664 13.8833 39.9656 14.5691 40 15.2782V15.4096C39.9813 16.0078 39.7094 16.5895 39.2578 16.982C36.3539 19.5318 33.4484 22.0792 30.5453 24.6289C31.3867 28.3249 32.2211 32.0217 33.0617 35.7178C33.2539 36.3605 33.1875 37.0931 32.7938 37.6483C32.2117 38.5443 30.9156 38.8383 29.9992 38.2949C26.6656 36.3018 23.3352 34.3041 20.0008 32.3134C16.6859 34.2986 13.3695 36.2839 10.0508 38.2628C9.21094 38.7922 8.01641 38.6202 7.37187 37.8609C6.90703 37.3511 6.725 36.6083 6.8875 35.939C7.74219 32.1672 8.59844 28.3961 9.45312 24.625C6.53594 22.0643 3.61875 19.5044 0.701562 16.9437C0.271875 16.5613 0.0234375 15.9968 0 15.4252V15.2798C0.0289063 14.2688 0.857813 13.361 1.86406 13.2547C5.73594 12.895 9.60859 12.5549 13.4805 12.1937C14.9984 8.6384 16.5164 5.08312 18.0344 1.52785Z" fill="#ffffff" />
          </svg>
        </button>
      </li>
    </ul>
  )
}