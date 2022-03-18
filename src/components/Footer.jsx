import { Link } from 'gatsby'
import React, { useContext } from 'react'
import styled from 'styled-components'
import AppContext from './AppContext'
import { isBrowser } from '../utils/isBrowser'

const StyledFooter = styled.footer`
  font-size: 1.5rem;
  padding: 5rem;
  text-align: center;
  background-color: var(--color-bg-${props => props.theme.theme}-alt);
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
`

const Footer = () => {
  const { theme } = useContext(AppContext)

  return (
    <StyledFooter>
      <span>
        <strong>&copy; Radionautica</strong>
      </span>
      <p>
        Esta página fue creada con {theme === 'dark' ? '💜' : '💛'} por DeadOcean
      </p>
      {isBrowser && !window.location.pathname?.includes('admin') && <Link to='/admin/login'>Entrar al sistema...</Link>}
    </StyledFooter>
  )
}

export default Footer
