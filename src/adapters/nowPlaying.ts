/* eslint-disable camelcase */
import type { RawNowPlaying, Song } from '../typings'

export default class NowPlaying {
  shId: number
  playedAt: number
  duration: number
  playlist: string
  streamer: string
  isRequest: boolean
  song: Omit<Song, 'custom_values'>
  elapsed: number
  remaining: number

  constructor(rawNowPlaying: RawNowPlaying) {
    const { now_playing } = rawNowPlaying
    this.shId = now_playing.sh_id
    this.playedAt = now_playing.played_at
    this.duration = now_playing.duration
    this.playlist = now_playing.playlist
    this.streamer = now_playing.streamer
    this.isRequest = now_playing.is_request
    this.song = now_playing.song
    this.elapsed = now_playing.elapsed
    this.remaining = now_playing.remaining
  }
}
