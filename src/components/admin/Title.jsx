import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import Icofont from '../Icofont'

const BackButton = styled(Link)`
  display: flex;
  place-items: center;
`

const TitleBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  margin: 0 0 2rem;
  h1 { margin: 0; padding: 0; }
  @media only screen and (min-width: 60em) {
    margin-top: 3rem;
  }
`

const Title = ({ title, backTo }) => {
  return (
    <>
      <TitleBar>
        <BackButton to={backTo}>
          <Icofont className='icofont-arrow-left icofont-2x' />
          Volver
        </BackButton>
        <h1>{title}</h1>
      </TitleBar>
    </>
  )
}

export default Title
