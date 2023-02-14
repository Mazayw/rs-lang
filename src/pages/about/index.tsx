import { aboutData } from './about-data'
import { AboutMember } from './about-member'
import styles from './styles.module.scss'

function About() {
  const member = Object.keys(aboutData)

  return (
    <div className={styles['about']}>
      <h1 id={styles['about__title']}>About our team</h1>
      <ul className='members' id={styles['members']}>
        {member.map((el) => (
          <li className='member' key={`member-${el}`}>
            <AboutMember text={el} />
          </li>
        ))}
      </ul>
    </div>
  )
}
export default About
