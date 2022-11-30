import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import useTheme from '../../hooks/useTheme'
import type { Theme } from '../../typings/index'
import { useLocation } from '@reach/router'

const StyledFooter = styled.footer<Theme>`
  font-size: 1.5rem;
  padding: 5rem;
  text-align: center;
  background-color: var(--color-bg-${(props) => props.theme.variant}-alt);
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
`

const Footer = () => {
  const variant = useTheme((state) => state.variant)
  const location = useLocation()

  return (
    <StyledFooter>
      <span>
        <strong>&copy; Radionautica</strong>
      </span>
      <p>
        Esta página fue creada con {variant === 'dark' ? '💜' : '💛'} por
        DeadOcean
      </p>
      {!location.pathname.includes('admin') && (
        <Link to="/admin/login">Entrar al sistema...</Link>
      )}
    </StyledFooter>
  )
}

export default Footer
