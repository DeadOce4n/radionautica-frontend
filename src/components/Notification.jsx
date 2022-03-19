import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledNotification = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  width: calc(100vw - 3rem);
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  min-height: 6.5rem;
  font-size: 0.9em;
  font-weight: 700;
  margin: 1.5rem 0 0 0;
  padding: 2rem 2rem;
  border-radius: 10px;
  color: var(--color-bg-${props => props.theme.theme});
  background-color: var(--color-fg-accent-${props => props.theme.theme});
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
  @media only screen and (min-width: 40em) {
    width: 40em;
    top: 4rem;
    bottom: unset;
  }
`

const ErrorNotification = styled(StyledNotification)`
  background-color: var(--color-error-${props => props.theme.theme});
`

const Notification = ({ error, message }) => {
  if (error) {
    return <ErrorNotification>{message}</ErrorNotification>
  }
  return <StyledNotification>{message}</StyledNotification>
}

export default Notification

Notification.propTypes = {
  error: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
}
