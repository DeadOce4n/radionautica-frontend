import styled from 'styled-components'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-inline: auto;
  padding: 0 0 4rem 0;
  @media only screen and (min-width: 40em) {
    &.narrow { width: 80%; margin: 0; }
    padding: 0 6rem 0 4rem;
    height: 100%;
    & > *:first-child {
      margin-top: 3rem;
    }
  }
  &.centered {
    justify-content: center;
  }
`

export default Content
