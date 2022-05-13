import dayjs from 'dayjs'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import '../css/normalize.css'
import '../css/styles.css'
import { isKaraokeScheduled } from '../services/posts'
import storageAvailable from '../utils/storageAvailable'
import AppContext from './AppContext'
import Container from './Container'
import DjContainer from './DjContainer'
import Footer from './Footer'
import Navbar from './navbar/Navbar'
import Notification from './Notification'
import Player from './Player'
import { setTheme } from '../slices/themeSlice'

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

const GlobalStyle = createGlobalStyle`
  body {
    color: var(--color-fg-${props => props.theme.theme});
    background-color: var(--color-bg-${props => props.theme.theme});
  }
  h1, h2, h3, a {
    color: var(--color-fg-accent-${props => props.theme.theme});
  }
  pre, code {
    color: var(--color-bg-${props => props.theme.theme});
    background-color: var(--color-fg-${props => props.theme.theme});
  }
`

const Layout = ({ children }) => {
  // const [theme, setTheme] = useState('dark')
  const theme = useSelector(state => state.theme.value)
  const dispatch = useDispatch()
  const [srcUrl, setSrcUrl] = useState('')
  const audioElement = useRef(null)
  const [user, setUser] = useState({
    id: null,
    nick: null,
    token: null,
    isAuthed: false,
    radioApiKey: null
  })
  const [notification, setNotification] = useState({ message: '', error: false })

  useEffect(() => {
    if (storageAvailable('localStorage')) {
      const storedTheme = window.localStorage.getItem('theme')
      if (storedTheme) {
        dispatch(setTheme(storedTheme))
      }
      const storedUser = window.localStorage.getItem('user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    }
    audioElement.current.currentTime = 0;

    (async () => {
      try {
        const post = await isKaraokeScheduled()
        if (post) {
          const { date } = post.attributes
          setNotification({
            message: `Próximo karaoke: ${dayjs(date).format('DD/MM/YYYY hh:mmA')} 🎉`,
            error: false
          })
          setTimeout(() => {
            setNotification({ message: '', error: false })
          }, 6000)
        }
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  const pages = [
    { name: 'Sólo escuchar', route: '/escuchar' },
    { name: 'Acerca', route: '/acerca' },
    { name: 'Karaoke', route: '/karaoke' }
    // { name: 'Horarios', route: '/horarios' }
  ]

  return (
    <>
      <AppContext.Provider value={{
        audioElement,
        srcUrl,
        setSrcUrl,
        user,
        setUser,
        notification,
        setNotification
      }}
      >
        <ThemeProvider theme={{ theme }}>
          <GlobalStyle />
          <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
          >
            <Navbar pages={pages} />
            <main style={{ flex: 1 }}>
              {notification.message && <Notification message={notification.message} error={notification.error} />}
              <Container className='split'>
                <Sidebar>
                  <Player
                    radioUrl='https://radionautica.xyz/radio/8000/radio.mp3'
                    socketUrl='wss://radionautica.xyz/api/live/nowplaying/radionautica'
                  />
                  <DjContainer />
                </Sidebar>
                <div style={{ width: '100%' }}>
                  {children}
                </div>
              </Container>
            </main>
            <Footer />
            <audio preload='metadata' ref={audioElement}>
              <source src={srcUrl} type='audio/mpeg' />
            </audio>
          </div>
        </ThemeProvider>
      </AppContext.Provider>
    </>
  )
}

export default Layout
