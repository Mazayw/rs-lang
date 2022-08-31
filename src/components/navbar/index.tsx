import { menuItems } from './menu-items-data'
import { MenuItems } from './menu-items'
import styles from './styles.module.scss'
import { IWord } from '../types/interface'

const Navbar = ({ check20WordsInPage, setCheck20WordsInPage }: { check20WordsInPage: IWord[], setCheck20WordsInPage: React.Dispatch<React.SetStateAction<IWord[]>> }) => {
  return (
    <nav>
      <ul className={styles.menu}>
        {menuItems.map((menu, index) => {
          return <MenuItems items={menu} key={index} index={index} check20WordsInPage={check20WordsInPage} setCheck20WordsInPage={setCheck20WordsInPage} />
        })}
      </ul>
    </nav>
  )
}

export default Navbar
