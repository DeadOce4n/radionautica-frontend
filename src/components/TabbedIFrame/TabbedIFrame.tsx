import React, { useState } from 'react'
import styled from 'styled-components'
import type { IRCSource, Theme } from '../../typings'

const ChatFrame = styled.iframe<Theme>`
  flex-basis: 100%;
  border: 0;
  border-radius: 2rem 0 2rem 2rem;
  height: 80vh;
  width: 100%;
  overflow: hidden;
  z-index: 10;
  background-color: var(--color-fg-accent-${(props) => props.theme.variant});
`

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
  color: var(--color-bg-${(props) => props.theme.variant});
  background-color: var(--color-fg-${(props) => props.theme.variant});
  border: 2px solid var(--color-fg-${(props) => props.theme.variant});
  border-radius: 5px 5px 0 0;
  padding: 2px 10px 2px 10px;
  z-index: 1;
  cursor: pointer;
  &.active {
    color: var(--color-bg-${(props) => props.theme.variant});
    background-color: var(--color-fg-accent-${(props) => props.theme.variant});
    border: 2px solid var(--color-fg-accent-${(props) => props.theme.variant});
    padding: 5px 10px 5px 10px;
    z-index: 100;
  }
`

const Placeholder = styled.div`
  flex-basis: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 2rem 0 2rem 2rem;
  height: 80vh;
  width: 100%;
  overflow: hidden;
  z-index: 10;
  color: var(--color-bg-${(props) => props.theme.variant});
  background-color: var(--color-fg-accent-${(props) => props.theme.variant});
  cursor: pointer;
  font: 700 5rem var(--font-secondary);
  padding: 3rem;
`

interface Props {
  sources: IRCSource[]
  main: string
}

const TabbedIFrame = ({ sources, main }: Props) => {
  const [visibleFrame, setVisibleFrame] = useState(
    sources.filter((src) => src.name === main)[0]
  )
  const [frameIsVisible, setFrameIsVisible] = useState(false)

  const handleChangeSource = (sourceName: string) => {
    setVisibleFrame(sources.filter((src) => src.name === sourceName)[0])
  }

  const content = frameIsVisible ? (
    <ChatFrame
      src={visibleFrame.url}
      title={visibleFrame.name}
      frameBorder="0"
    />
  ) : (
    <Placeholder onClick={() => setFrameIsVisible(true)}>
      <span>Haz click aquí para cargar el chat</span>
    </Placeholder>
  )

  return (
    <>
      <Container>
        <Tabs>
          {sources.map((src) => (
            <Tab
              key={src.name}
              onClick={() => handleChangeSource(src.name)}
              className={visibleFrame.name === src.name ? 'active' : ''}
            >
              {src.name}
            </Tab>
          ))}
        </Tabs>
        {content}
      </Container>
    </>
  )
}

export default TabbedIFrame
