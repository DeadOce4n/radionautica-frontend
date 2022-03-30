import React, { useContext, useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import styled from 'styled-components'
import AppContext from './AppContext'
import Icofont from './Icofont'
import { useLocation } from '@reach/router'

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 3;
  align-self: flex-start;
  min-height: 64rem;
  width: 100%;
  h1, h2 {
    font-size: 4rem;
    align-self: flex-start;
    padding: 3rem 3rem 0;
    margin: 0;
  }
`

const AlbumArt = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  img {
    border-radius: 2rem;
    margin: 3rem 6rem 0;
    filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.3));
    overflow: hidden;
    object-fit: cover;
    aspect-ratio: 1 / 1;
  }
  @media only screen and (min-width: 40em) {
    img { width: 300px; }
  }
`

const PlayerData = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 4rem 4rem 2rem;
`

const DataItem = styled.div`
  font-family: "Darker Grotesque", sans-serif;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  span.data-item {
    font-size: 2.75rem;
    text-align: center;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    &.title { font-weight: 800; }
    &.dj { font-size: 2.5rem; }
    &.artist { font-weight: 300; }
    @media only screen and (min-width: 40em) {
      font-size: 2.25rem;
      &.dj { font-size: 2rem; }
    }
  }
`

const PlayerControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  width: 100%;
  padding: 0 8rem 6rem;
`

const PlayPauseButton = styled.button`
  display: flex;
  place-items: center;
  color: var(--color-fg-accent-${props => props.theme.theme});
  background-color: transparent;
  font-size: 5rem;
  border: none;
  cursor: pointer;
  &:active { transform: scale(0.98); }
`

const Slider = styled.input.attrs(props => ({ type: 'range' }))`
  appearance: none;
  background-color: var(--color-fg-${props => props.theme.theme});
  width: 15rem;
  height: 0.5rem;
  border-radius: 2px;
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;
    background-color: var(--color-fg-accent-${props => props.theme.theme});
    height: 2rem;
    width: 2rem;
    border: none;
    border-radius: 50%;
  }
  &::-moz-range-thumb {
    appearance: none;
    background-color: var(--color-fg-accent-${props => props.theme.theme});
    height: 2rem;
    width: 2rem;
    border: none;
    border-radius: 50%;
  }
`

const Player = ({ radioUrl, socketUrl }) => {
  const [nowPlaying, setNowPlaying] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(80)
  const [metadata, setMetadata] = useState({
    title: null,
    artist: null,
    album: null,
    art: null,
    streamerName: null
  })
  const { lastJsonMessage } = useWebSocket(socketUrl)
  const {
    audioElement,
    srcUrl,
    setSrcUrl
  } = useContext(AppContext)

  const location = useLocation()

  useEffect(() => {
    if (!audioElement.current.paused) {
      setIsPlaying(true)
    }
  }, [])

  useEffect(() => {
    setNowPlaying(lastJsonMessage)
  }, [lastJsonMessage])

  useEffect(() => {
    if (nowPlaying) {
      setMetadata({
        title: nowPlaying.now_playing.song.title,
        artist: nowPlaying.now_playing.song.artist,
        album: nowPlaying.now_playing.song.album,
        art: nowPlaying.now_playing.song.art,
        streamerName: nowPlaying.live.streamer_name
      })
    }
  }, [nowPlaying])

  useEffect(() => {
    if ('mediaSession' in navigator) {
      /* eslint-disable-next-line no-undef */
      navigator.mediaSession.metadata = new MediaMetadata({
        title: metadata.title,
        artist: metadata.artist,
        album: metadata.album,
        artwork: [{ src: metadata.art, type: 'image/jpg' }]
      })
    }
  }, [metadata])

  const handlePlayPause = () => {
    if (isPlaying) {
      audioElement.current.pause()
      setSrcUrl('')
    } else {
      // Firefox caches the audio stream and does weird things when reloading
      // the page or pausing/resuming playback; appending a 'refresh' parameter
      // with a random value to the src url fixes this.
      setSrcUrl(navigator.userAgent.includes('Firefox') ? `${radioUrl}?refresh=${Date.now()}` : radioUrl)
    }
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    // See handlePlayPause for an explanation of this
    if (srcUrl.includes(radioUrl)) {
      audioElement.current.load()
      audioElement.current.play().catch(e => console.log(e))
    }
  }, [srcUrl])

  const handleVolume = event => {
    const newVolume = event.target.value
    setVolume(newVolume)
    audioElement.current.volume = newVolume / 100
  }

  return (
    <>
      <PlayerContainer>
        {location.pathname === '/' ? <h1>Radio</h1> : <h2>Radio</h2>}
        <AlbumArt>
          <img
            src={metadata.art}
            alt={metadata.album}
            title={metadata.album}
          />
        </AlbumArt>
        <PlayerData>
          <DataItem title={metadata.streamerName || 'AutoDJ'}>
            <span className='data-item dj'>{metadata.streamerName || 'AutoDJ'}</span>
          </DataItem>
          <DataItem title={metadata.title}>
            <span className='data-item title'>{metadata.title}</span>
          </DataItem>
          <DataItem title={metadata.artist}>
            <span className='data-item artist'>{metadata.artist}</span>
          </DataItem>
        </PlayerData>
        <PlayerControls>
          <PlayPauseButton onClick={handlePlayPause} aria-label='play pause button'>
            <Icofont className={isPlaying ? 'icofont-pause' : 'icofont-play-alt-1'} />
          </PlayPauseButton>
          <Slider min='0' max='100' value={volume} onChange={handleVolume} />
        </PlayerControls>
      </PlayerContainer>
    </>
  )
}

export default Player
