import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin: 0rem 0 4rem 0;
  margin-inline: auto;
  height: 100%;

  @media only screen and (min-width: 40em) {
    &.split {
      flex-direction: row;
    }
  }
`

const Container = ({ children, className }) => {
  return (
    <StyledContainer className={className}>
      {children}
    </StyledContainer>
  )
}

export default Container
