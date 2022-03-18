import styled from 'styled-components'

const ChatFrame = styled.iframe`
  flex-basis: 100%;
  border: 0;
  border-radius: 2rem 0 2rem 2rem;
  height: 80vh;
  width: 100%;
  overflow: hidden;
  z-index: 10;
  background-color: var(--color-fg-accent-${props => props.theme.theme});
`

export default ChatFrame
