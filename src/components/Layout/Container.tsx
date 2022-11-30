import React, { type ReactNode } from 'react'
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

interface Props {
  children: ReactNode
  className: string
}

const Container = ({ children, className }: Props) => {
  return <StyledContainer className={className}>{children}</StyledContainer>
}

export default Container
