import React, { type ComponentProps } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { Theme } from '../../typings/index'

const StyledLink = styled(Link)<Theme>`
  font: 700 0.875em var(--font-secondary);
  text-decoration: none;
  color: var(--color-fg-accent-${(props) => props.theme.variant});
  padding: 1rem;

  &:nth-child(1) {
    margin-top: 1rem;
  }
  &:last-child {
    margin-bottom: 1rem;
  }

  @media only screen and (min-width: 40em) {
    padding: 1rem;
    &:nth-child(1) {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
`

const NavbarLink = (props: ComponentProps<typeof StyledLink>) => (
  <StyledLink {...props} />
)

export default NavbarLink
