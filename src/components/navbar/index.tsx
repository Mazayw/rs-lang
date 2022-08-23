import { menuItems } from './menu-items-data'
import { MenuItems } from './menu-items'
import styles from './styles.module.scss'

const Navbar = () => {
  return (
    <nav>
      <ul className={styles.menu}>
        {menuItems.map((menu, index) => {
          return <MenuItems items={menu} key={index} />
        })}
      </ul>
    </nav>
  )
}

export default Navbar
