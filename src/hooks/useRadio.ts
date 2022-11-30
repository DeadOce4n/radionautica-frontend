import { useState, type MutableRefObject } from 'react'
import { useQuery } from '@tanstack/react-query'
import { crud } from '../services/crudService'
import { RawNowPlaying } from '../typings'
import NowPlaying from '../adapters/nowPlaying'
import { NOWPLAYING_URL } from '../utils/constants'

export const useNowPlaying = () => {
  const { status, data } = useQuery({
    queryKey: ['radio', 'nowPlaying'],
    queryFn: async () => {
      const response = await crud<void, RawNowPlaying>({
        endpoint: NOWPLAYING_URL,
        method: 'GET',
      })
      return new NowPlaying(response.data)
    },
    refetchInterval: 5000,
    onSuccess: (data) => {
      if (window && 'mediaSession' in window.navigator && data) {
        navigator.mediaSession.metadata = new window.MediaMetadata({
          title: data.song.title,
          artist: data.song.artist,
          album: data.song.album,
          artwork: [{ src: data.song.art }],
        })
      }
    },
  })

  return {
    status,
    data,
  }
}

export const useControls = (
  audioElement: MutableRefObject<null | HTMLAudioElement>,
  src: string
) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(80)

  const handlePlayPause = () => {
    if (audioElement && audioElement.current) {
      if (!isPlaying) {
        audioElement.current.src = window?.navigator.userAgent.includes(
          'Firefox'
        )
          ? `${src}?refresh=${Date.now()}`
          : src
        audioElement.current.load()
        audioElement.current.play().catch((e) => console.log(e))
      } else {
        audioElement.current.pause()
        audioElement.current.src = ''
      }
      setIsPlaying((prev) => !prev)
    }
  }

  const handleVolume = (vol: number) => {
    if (audioElement && audioElement.current) {
      setVolume(vol)
      audioElement.current.volume = vol / 100
    }
  }

  return {
    isPlaying,
    handlePlayPause,
    volume,
    handleVolume,
  }
}
