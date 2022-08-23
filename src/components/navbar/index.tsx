import { menuItems } from './menu-items-data'
import { MenuItems } from './menu-items'

const Navbar = () => {
  return (
    <>
      {menuItems.map((menu, index) => {
        return <MenuItems items={menu} key={index} />
      })}
    </>
  )
}

export default Navbar

/*

 <NavLink className={setActive} to={menu.url} key={index}>
            {menu.title}
          </NavLink>


 <NavLink to='/' className={setActive}>
              Главная
            </NavLink>
            <NavLink className={setActive} to='/vocabulary'>
              Учебник
            </NavLink>
            <Dropdown className='dropdown-groove'>
              <Dropdown.Toggle variant='link' id='dropdown-basic'>
                Мини-игры
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={NavLink} to='/login'>
                  Login
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} to='/products'>
                  Products
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <NavLink className={setActive} to='/'>
              Мини-игры
            </NavLink>
            <NavLink className={setActive} to='/about'>
              О команде
            </NavLink>
            <NavLink className={setActive} to='/statistics'>
              Мой прогресс
            </NavLink>*/
