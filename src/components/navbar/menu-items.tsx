import Dropdown from './dropdown'
import { IMenu, IWord } from '../types/interface'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.scss'
import { useState, useRef, useEffect } from 'react'

export const MenuItems = ({ items, index, check20WordsInPage, setCheck20WordsInPage }: { items: IMenu, index: number, check20WordsInPage: IWord[], setCheck20WordsInPage: React.Dispatch<React.SetStateAction<IWord[]>> }) => {
  const setActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.active} ${styles.menu__item}` : styles.menu__item

  const [dropdown, setDropdown] = useState(false)

  const ref = useRef<HTMLLIElement | null>(null)
  useEffect(() => {
    const handler = (event: TouchEvent | MouseEvent) => {
      if (dropdown && ref.current && !ref.current?.contains(event.target as Node)) {
        setDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [dropdown])

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true)
  }

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false)
  }

  return (
    <li
      className={`${styles['menu__item']} ${check20WordsInPage.length === 20 && index === 2 ? styles['menu__item_disabled'] : ''}`}
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {items.submenu ? (
        <>
          <a
            role='button'
            aria-haspopup='menu'
            className={styles.menu__item}
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {items.title}{' '}
          </a>
          <span className={styles.arrow} />
          <Dropdown submenus={items.submenu} setActive={setActive} dropdown={dropdown} />
        </>
      ) : (
        <NavLink className={setActive} to={items.url} >
          {items.title}
        </NavLink>
      )}
    </li>
  )
}
