import Dropdown from './dropdown'
import { IMenu } from '../types/interface'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.scss'

export const MenuItems = ({ items }: { items: IMenu }) => {
  const setActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.active} ${styles.menu__item}` : styles.menu__item
  return (
    <>
      {items.submenu ? (
        <>
          <NavLink role='button' aria-haspopup='menu' to={items.url} className={setActive}>
            {items.title}{' '}
          </NavLink>
          <Dropdown submenus={items.submenu} setActive={setActive} />
        </>
      ) : (
        <NavLink className={setActive} to={items.url}>
          {items.title}
        </NavLink>
      )}
    </>
  )
}
