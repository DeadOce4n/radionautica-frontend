import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React, { useContext, useState } from 'react'
import storageAvailable from '../../utils/storageAvailable'
import AppContext from '../AppContext'
import Icofont from '../Icofont'
import LogoIcon from '../LogoIcon'
import NavbarLink from './NavbarLink'
import Nav from './styles.js'
import { toggle, setTheme } from '../../slices/themeSlice'
import { useDispatch, useSelector } from 'react-redux'

const Navbar = ({ pages }) => {
  const dispatch = useDispatch()
  const theme = useSelector(state => state.theme.value)
  const [visible, setVisible] = useState(false)

  const handleToggle = () => {
    dispatch(toggle())
    setVisible(!visible)
    if (storageAvailable('localStorage')) {
      localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light')
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
          <Icofont className={theme === 'dark' ? 'icofont-moon' : 'icofont-sun'} />
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
