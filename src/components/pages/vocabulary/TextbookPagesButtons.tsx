import styles from './styles.module.scss';
import { INDEX_STAR_SECTION_BUTTON } from '.';
import { IWord } from '../../types/interface';

export function TextbookPagesButtons({ textbookNumberPage, buttonSectionCurrentIndex, clickPrevPage, clickNextPage, check20WordsInPage }: { textbookNumberPage: number, buttonSectionCurrentIndex: number, clickPrevPage: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void, clickNextPage: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void, check20WordsInPage: IWord[] }) {
  const page = {
    first: 1,
    last: 30,
    disabled: '#1F2143',
    active: 'rgba(255, 255, 255, 0.3)',
  };

  return (
    <div className={INDEX_STAR_SECTION_BUTTON === buttonSectionCurrentIndex ? styles['page-buttons_none'] : styles['page-buttons']}>
      <button className={styles['page-buttons__arrow-left']} disabled={(textbookNumberPage + 1) === page.first ? true : false} onClick={(e) => clickPrevPage(e)}>
        <svg width="70" height="68" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g id="#000000ff">
            <path fill={(textbookNumberPage + 1) === page.first ? page.disabled : page.active} opacity="1.00" d=" M 149.44 0.00 L 152.20 0.00 C 159.33 0.60 166.13 3.77 171.09 8.92 C 246.61 84.41 322.12 159.91 397.60 235.44 C 406.60 243.84 408.99 258.26 403.08 269.08 C 400.89 273.34 397.36 276.65 394.01 279.99 C 321.52 352.48 249.03 424.98 176.53 497.47 C 172.85 501.06 169.42 505.04 165.01 507.79 C 160.97 510.32 156.28 511.57 151.56 512.00 L 148.79 512.00 C 144.84 511.53 140.89 510.63 137.37 508.73 C 131.84 505.84 127.83 500.92 123.40 496.67 C 119.48 492.60 115.19 488.85 111.61 484.46 C 105.76 477.15 104.10 466.82 107.23 458.01 C 108.76 453.42 111.70 449.48 115.11 446.11 C 178.50 382.71 241.91 319.33 305.28 255.91 C 241.80 192.32 178.21 128.84 114.72 65.26 C 106.63 57.67 103.60 45.23 107.69 34.86 C 110.32 27.43 116.73 22.48 121.99 16.97 C 126.26 12.90 130.09 8.32 134.91 4.87 C 139.18 1.92 144.30 0.43 149.44 0.00 Z" />
          </g>
        </svg>
      </button>
      <p className={`${styles['page-buttons__page']} ${check20WordsInPage.length === 20 ? styles['page-buttons__page_active'] : page.disabled}`} >{textbookNumberPage + 1}</p>
      <button className={styles['page-buttons__arrow-right']} disabled={(textbookNumberPage + 1) === page.last ? true : false} onClick={(e) => clickNextPage(e)}>
        <svg width="70" height="68" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g id="#000000ff">
            <path fill={(textbookNumberPage + 1) === page.last ? page.disabled : page.active} opacity="1.00" d=" M 149.44 0.00 L 152.20 0.00 C 159.33 0.60 166.13 3.77 171.09 8.92 C 246.61 84.41 322.12 159.91 397.60 235.44 C 406.60 243.84 408.99 258.26 403.08 269.08 C 400.89 273.34 397.36 276.65 394.01 279.99 C 321.52 352.48 249.03 424.98 176.53 497.47 C 172.85 501.06 169.42 505.04 165.01 507.79 C 160.97 510.32 156.28 511.57 151.56 512.00 L 148.79 512.00 C 144.84 511.53 140.89 510.63 137.37 508.73 C 131.84 505.84 127.83 500.92 123.40 496.67 C 119.48 492.60 115.19 488.85 111.61 484.46 C 105.76 477.15 104.10 466.82 107.23 458.01 C 108.76 453.42 111.70 449.48 115.11 446.11 C 178.50 382.71 241.91 319.33 305.28 255.91 C 241.80 192.32 178.21 128.84 114.72 65.26 C 106.63 57.67 103.60 45.23 107.69 34.86 C 110.32 27.43 116.73 22.48 121.99 16.97 C 126.26 12.90 130.09 8.32 134.91 4.87 C 139.18 1.92 144.30 0.43 149.44 0.00 Z" />
          </g>
        </svg>
      </button>
    </div>
  )
}