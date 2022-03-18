import React, { useState, useContext } from 'react'
import { Link } from 'gatsby'
import Nav from './styles.js'
import PropTypes from 'prop-types'
import AppContext from '../AppContext'
import storageAvailable from '../../utils/storageAvailable'
import NavbarLink from './NavbarLink'
import Icofont from '../Icofont'
import LogoIcon from '../LogoIcon'

const Navbar = ({ pages }) => {
  const context = useContext(AppContext)
  const [visible, setVisible] = useState(false)
  const toggleTheme = () => context.setTheme(context.theme === 'light' ? 'dark' : 'light')

  const handleToggle = () => {
    toggleTheme()
    setVisible(!visible)
    if (storageAvailable('localStorage')) {
      localStorage.setItem('theme', context.theme === 'light' ? 'dark' : 'light')
    }
  }

  return (
    <Nav.Container>
      <Nav.Start>
        <Nav.Logo>
          <Link to='/'><LogoIcon /></Link>
          <Link to='/'>Radionautica</Link>
        </Nav.Logo>
        <Nav.BurgerButton
          onClick={() => setVisible(!visible)}
          visible={visible}
          aria-label='burger-menu'
        >
          <span />
          <span />
          <span />
        </Nav.BurgerButton>
      </Nav.Start>
      <Nav.Menu visible={visible}>
        {pages ? pages.map(page => <NavbarLink key={page.name} to={page.route} onClick={() => setVisible(!visible)}>{page.name}</NavbarLink>) : null}
        <Nav.ThemeButton onClick={handleToggle}>
          <Icofont className={context.theme === 'dark' ? 'icofont-moon' : 'icofont-sun'} />
        </Nav.ThemeButton>
      </Nav.Menu>
      <Nav.End visible={visible} />
    </Nav.Container>
  )
}

export default Navbar

Navbar.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired
  }).isRequired).isRequired
}
