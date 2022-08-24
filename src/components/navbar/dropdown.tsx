import { IMenuMain } from '../types/interface'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.scss'

const Dropdown = ({
  submenus,
  setActive,
  dropdown,
}: {
  submenus: Array<IMenuMain>
  setActive: ({ isActive }: { isActive: boolean }) => string
  dropdown: boolean
}) => {
  return (
    <div className={dropdown ? `${styles.dropdown} ${styles.show}` : styles.dropdown}>
      <span className={styles.padding}></span>
      {submenus.map((submenu, index) => (
        <NavLink className={setActive} to={submenu.url} key={index}>
          {submenu.title}
        </NavLink>
      ))}
    </div>
  )
}

export default Dropdown
