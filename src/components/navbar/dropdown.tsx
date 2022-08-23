import { IMenuMain } from '../types/interface'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.scss'

const Dropdown = ({
  submenus,
  setActive,
}: {
  submenus: Array<IMenuMain>
  setActive: ({ isActive }: { isActive: boolean }) => string
}) => {
  return (
    <div className={styles.dropdown}>
      {submenus.map((submenu, index) => (
        <NavLink className={setActive} to={submenu.url} key={index}>
          {submenu.title}
        </NavLink>
      ))}
    </div>
  )
}

export default Dropdown
