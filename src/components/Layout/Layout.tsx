import React, { useRef, type ReactNode } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import GlobalStyle from '../../styles/global'
import useTheme from '../../hooks/useTheme'
import { useControls, useNowPlaying } from '../../hooks/useRadio'
import Navbar from '../Navbar/Navbar'
import Container from './Container'
import Player from '../Player/Player'
import Footer from './Footer'
import { type Page } from '../../typings/index'
import '../../styles/styles.css'
import '../../styles/normalize.css'
import { AZURACAST_URL, RADIO_SRC } from '../../utils/constants'

interface Props {
  children: ReactNode
}

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  @media only screen and (min-width: 40em) {
    max-width: 40rem;
    margin: 1rem 0 0 2rem;
  }
`

const pages: Page[] = [
  { name: 'Sólo escuchar', route: '/escuchar' },
  { name: 'Acerca', route: '/acerca' },
  { name: 'Karaoke', route: '/karaoke' },
]

const Layout = ({ children }: Props) => {
  const variant = useTheme((state) => state.variant)
  const audioElement = useRef<null | HTMLAudioElement>(null)
  const radioSrc = `${AZURACAST_URL}${RADIO_SRC}`
  const { status, data } = useNowPlaying()
  const { volume, handleVolume, isPlaying, handlePlayPause } = useControls(
    audioElement,
    radioSrc
  )

  return (
    <ThemeProvider theme={{ variant }}>
      <GlobalStyle />
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Navbar pages={pages} />
        <main style={{ flex: 1 }}>
          <Container className="split">
            <Sidebar>
              <Player
                volume={volume}
                handleVolume={handleVolume}
                isPlaying={isPlaying}
                handlePlayPause={handlePlayPause}
                status={status}
                data={data}
              />
            </Sidebar>
            <div style={{ width: '100%' }}>{children}</div>
          </Container>
        </main>
        <Footer />
      </div>
      <audio preload="metadata" ref={audioElement}>
        <source type="audio/mpeg" />
      </audio>
    </ThemeProvider>
  )
}

export default Layout
