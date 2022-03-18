import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  color: var(--color-fg-accent-${props => props.theme.theme});
  background-color: transparent;
  font: 700 1em var(--font-secondary);
  padding: 1.25rem;
  border: 3px solid var(--color-fg-accent-${props => props.theme.theme});
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.25s;
  &:active {
    transform: scale(0.98);
  }
`

const PrimaryButton = styled(StyledButton)`
  color: var(--color-bg-${props => props.theme.theme});
  background-color: var(--color-fg-accent-${props => props.theme.theme});
`

const Button = props => {
  if (props.primary) {
    return <PrimaryButton {...props} />
  } else {
    return <StyledButton {...props} />
  }
}

export default Button

Button.propTypes = {
  primary: PropTypes.bool
}
