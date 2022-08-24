import styles from './styles.module.scss'
import { aboutData } from './about-data'
import { INickname } from '../../types/about-interface'

export function AboutMember(props: INickname) {
  const nickname = props.text

  return (
    <div
      className={styles['about__member']}
      onClick={() => window.open(`${aboutData[nickname].link}`, '_blank')}
    >
      <img
        className={styles['member__photo']}
        src={aboutData[nickname].photo}
        alt="member's team"
      />
      <div className={styles['member__about']}>

          <h3 className={styles['member__name']}>{aboutData[nickname].name}</h3>
          <div className={styles['member__title']}>{aboutData[nickname].title}</div>

        <div className={styles['member__content']}>{aboutData[nickname].content}</div>
      </div>
    </div>
  )
}
