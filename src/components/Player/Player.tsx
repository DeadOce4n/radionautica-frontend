import React from 'react'
import styled from 'styled-components'
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'
import { useLocation } from '@reach/router'
import NowPlaying from '../../adapters/nowPlaying'
import { type Theme } from '../../typings/index'
import Loader from '../Loader/Loader'

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 3;
  align-self: flex-start;
  min-height: 64rem;
  width: 100%;
  h1,
  h2 {
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
    img {
      width: 300px;
    }
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
  font-family: 'Darker Grotesque', sans-serif;
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
    &.title {
      font-weight: 800;
    }
    &.dj {
      font-size: 2.5rem;
    }
    &.artist {
      font-weight: 300;
    }
    @media only screen and (min-width: 40em) {
      font-size: 2.25rem;
      &.dj {
        font-size: 2rem;
      }
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

const PlayPauseButton = styled.button<Theme>`
  display: flex;
  place-items: center;
  color: var(--color-fg-accent-${(props) => props.theme.variant});
  background-color: transparent;
  font-size: 5rem;
  border: none;
  cursor: pointer;
  &:active {
    transform: scale(0.98);
  }
`

const Slider = styled.input.attrs<Theme>(() => ({ type: 'range' }))`
  appearance: none;
  background-color: var(--color-fg-${(props) => props.theme.variant});
  width: 15rem;
  height: 0.5rem;
  border-radius: 2px;
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;
    background-color: var(--color-fg-accent-${(props) => props.theme.variant});
    height: 2rem;
    width: 2rem;
    border: none;
    border-radius: 50%;
  }
  &::-moz-range-thumb {
    appearance: none;
    background-color: var(--color-fg-accent-${(props) => props.theme.variant});
    height: 2rem;
    width: 2rem;
    border: none;
    border-radius: 50%;
  }
`

interface Props {
  volume: number
  handleVolume: (volume: number) => void
  isPlaying: boolean
  handlePlayPause: () => void
  status: 'success' | 'error' | 'loading'
  data?: NowPlaying
}

const Player = ({
  volume,
  handleVolume,
  isPlaying,
  handlePlayPause,
  status,
  data,
}: Props) => {
  const { pathname } = useLocation()

  return (
    <PlayerContainer>
      {pathname === '/' ? <h1>Radio</h1> : <h2>Radio</h2>}
      <AlbumArt>
        {status === 'loading' ? (
          <Loader />
        ) : (
          <img
            src={status === 'success' && data ? data.song.art : ''}
            alt={status === 'success' && data ? data.song.album : 'Cargando...'}
            title={
              status === 'success' && data ? data.song.album : 'Cargando...'
            }
          />
        )}
      </AlbumArt>
      <PlayerData>
        <DataItem title={data?.streamer ?? 'AutoDJ'}>
          <span className="data-item dj">{data?.streamer ?? 'AutoDJ'}</span>
        </DataItem>
        <DataItem>
          <span className="data-item title">{data?.song.title ?? '-'}</span>
        </DataItem>
        <DataItem>
          <span className="data-item artist">{data?.song.artist ?? '-'}</span>
        </DataItem>
      </PlayerData>
      <PlayerControls>
        <PlayPauseButton
          onClick={handlePlayPause}
          aria-label="play pause button"
        >
          {isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
        </PlayPauseButton>
        <Slider
          min={0}
          max={100}
          value={volume}
          onChange={(e) => handleVolume(Number(e.target.value))}
        />
      </PlayerControls>
    </PlayerContainer>
  )
}

export default Player
