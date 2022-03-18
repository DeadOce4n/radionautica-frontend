import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components'
import ChatFrame from './ChatFrame'

const Container = styled.div`
  width: 100%;
  height: 100%;
  filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.3));
`

const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 5px;
`

const Tab = styled.button`
  font: 600 0.75em var(--font-primary);
  color: var(--color-bg-${props => props.theme.theme});
  background-color: var(--color-fg-${props => props.theme.theme});
  border: 2px solid var(--color-fg-${props => props.theme.theme});
  border-radius: 5px 5px 0 0;
  padding: 2px 10px 2px 10px;
  z-index: 1;
  cursor: pointer;
  &.active {
    color: var(--color-bg-${props => props.theme.theme});
    background-color: var(--color-fg-accent-${props => props.theme.theme});
    border: 2px solid var(--color-fg-accent-${props => props.theme.theme});
    padding: 5px 10px 5px 10px;
    z-index: 100;
  }
`

const TabbedIFrame = ({ sources, main }) => {
  const [visibleFrame, setVisibleFrame] = useState(sources.filter(src => src.name === main)[0])

  const handleChangeSource = sourceName => {
    setVisibleFrame(sources.filter(src => src.name === sourceName)[0])
  }

  return (
    <>
      <Container>
        <Tabs>
          {sources.map(src => (
            <Tab
              key={src.name}
              onClick={() => handleChangeSource(src.name)}
              className={visibleFrame.name === src.name ? 'active' : ''}
            >
              {src.name}
            </Tab>
          ))}
        </Tabs>
        <ChatFrame src={visibleFrame.url} title={visibleFrame.name} />
      </Container>
    </>
  )
}

export default TabbedIFrame

TabbedIFrame.propTypes = {
  sources: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  })),
  main: PropTypes.string.isRequired
}
