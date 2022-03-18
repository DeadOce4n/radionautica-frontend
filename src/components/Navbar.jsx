import { Link } from 'gatsby'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import storageAvailable from '../utils/storageAvailable'
import AppContext from './AppContext'
import Icofont from './Icofont'
import LogoIcon from './LogoIcon'

const NavbarWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font: 700 1.5rem;
  padding: 1.5rem 2rem;
  width: 100%;
  border-bottom: 1px solid rgba(${props => props.theme.theme === 'light' ? '0, 0, 0' : '255, 255, 255'}, 0.3);

  @media only screen and (min-width: 40em) {
    flex-direction: row;
  }
`

const NavbarStart = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 6rem;
  width: 100%;

  @media only screen and (min-width: 40em) {
    width: auto;
    height: 5rem;
  }
`

const Logo = styled.div`
  font: 700 2.75rem var(--font-logo);
  display: flex;
  flex-direction: row;
  align-items: center;
  a {
    text-decoration: none;
    color: var(--color-fg-accent-${props => props.theme.theme});
  }
  path {
    fill: var(--color-fg-accent-${props => props.theme.theme});
  }
  svg {
    width: 4rem;
    height: 100%;
    position: relative;
    margin-right: 2px;
    padding: 0;
    z-index: -9;
  }
`

const BurgerButton = styled.button`
  background-color: transparent;
  border: 0 none transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 5rem;
  padding: 1.2rem 1.5rem;
  margin-left: auto;
  opacity: 1;
  visibility: visible;
  transition: opacity 0.5s, max-height 0.2s;
  cursor: pointer;
  @media only screen and (min-width: 40em) {
    opacity: 0;
    visibility: hidden;
    width: 0;
  }
  span {
    display: block;
    width: 2.5rem;
    height: 2px;
    margin: 2px;
    background-color: var(--color-fg-accent-${props => props.theme.theme});
  }
  span:first-child {
    ${props => {
      if (props.visible) {
        return 'transform: translateY(4px) rotate(45deg);'
      }
    }}
    transition: all 0.1s ease-out;
  }
  span:nth-child(2) {
    display: ${props => props.visible ? 'none' : 'block'};
  }
  span:last-child {
    ${props => {
      if (props.visible) {
        return 'transform: translateY(-4px) rotate(-45deg);'
      }
    }}
    transition: all 0.1s ease-out;
  }
`

const NavbarMenu = styled.div`
  display: flex;
  flex-direction: column;
  opacity: ${props => (props.visible ? 1 : 0)};
  max-height: ${props => (props.visible ? '20rem' : 0)};
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  width: 100%;
  padding-left: 2rem;
  transition: opacity 0.5s, max-height 0.2s;

  @media only screen and (min-width: 40em) {
    opacity: 1;
    height: 5rem;
    max-height: 20rem;
    visibility: visible;
    flex-direction: row;
    align-items: center;
  }
`

const NavbarLink = styled(Link)`
  font: 700 1.75rem var(--font-secondary);
  text-decoration: none;
  color: var(--color-fg-accent-${props => props.theme.theme});
  padding: 1rem;

  &:nth-child(1) { margin-top: 1rem; }
  &:last-child { margin-bottom: 1rem; }

  @media only screen and (min-width: 40em) {
    padding: 1rem;
    &:nth-child(1) { margin-top: 0; }
    &:last-child { margin-bottom: 0; }
  }
`

const NavbarEnd = styled.div`
  font: 700 1.75rem var(--font-secondary);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  opacity: ${props => (props.visible ? 1 : 0)};
  max-height: ${props => (props.visible ? '20rem' : 0)};
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  transition: opacity 0.5s, max-height 0.2s;

  & > * {
    padding: 1rem;
    margin: 0 1rem 1rem;
  } i {
    color: var(--color-fg-accent-${props => props.theme.theme});
    margin-right: 1rem;
  }

  @media only screen and (min-width: 40em) {
    width: unset;
    opacity: 1;
    height: 5rem;
    max-height: 20rem;
    visibility: visible;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    & > * {
      padding: 1rem;
      margin: 0;
    }
`

const ThemeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-fg-accent-${props => props.theme.theme});
  background-color: transparent;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  span {
    @media only screen and (min-width: 40em) {
      visibility: hidden;
      width: 0;
    }
  }
`

const Navbar = ({ pages }) => {
  const [visible, setVisible] = useState(false)
  const { theme, setTheme } = useContext(AppContext)
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  const handleToggle = () => {
    toggleTheme()
    setVisible(!visible)
    if (storageAvailable('localStorage')) {
      localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light')
    }
  }

  return (
    <NavbarWrapper>
      <NavbarStart>
        <Logo>
          <LogoIcon />
          <Link to='/'>Radionautica</Link>
        </Logo>
        <BurgerButton
          onClick={() => setVisible(!visible)}
          visible={visible}
          aria-label='burger menu'
        >
          <span />
          <span />
          <span />
        </BurgerButton>
      </NavbarStart>
      <NavbarMenu visible={visible}>
        {pages
          ? pages.map(page => (
            <NavbarLink
              to={`/${page.toLowerCase()}`}
              key={page}
              onClick={() => setVisible(!visible)}
            >
              {page}
            </NavbarLink>
            ))
          : null}
      </NavbarMenu>
      <NavbarEnd visible={visible}>
        <ThemeButton onClick={handleToggle}>
          <Icofont className={`icofont-${theme === 'dark' ? 'moon' : 'sun'} icofont-md`} />
          <span>
            Tema {theme === 'dark' ? 'oscuro' : 'claro'}
          </span>
        </ThemeButton>
      </NavbarEnd>
    </NavbarWrapper>
  )
}

export default Navbar
