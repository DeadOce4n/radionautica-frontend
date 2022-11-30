export type GenericRequest<T = void> = {
  endpoint: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  payload?: T
  meta?: {
    token?: string
    limit?: number
    skip?: number
    filters?: unknown
    sort?: string
  }
}

export interface GenericResponse<T = undefined> {
  data: T
  meta?: {
    success?: boolean
    message?: string
    count?: number
  }
}

export interface Mount {
  id: number
  name: string
  url: string
  bitrate: number
  format: string
  listeners: {
    total: string
    unique: string
    current: string
  }
  path: string
  is_default: boolean
}

export interface Song {
  id: string
  text: string
  artist: string
  title: string
  album: string
  genre: string
  isrc: string
  lyrics: string
  art: string
  custom_fields: unknown[]
}

export interface RawNowPlaying {
  station: {
    id: number
    name: string
    shortcode: string
    description: string
    frontend: string
    backend: string
    listen_url: string
    url: string
    public_player_url: string
    playlist_pls_url: string
    playlist_m3u_url: string
    is_public: boolean
    mounts: Mount[]
    remotes: unknown[]
    hls_enabled: boolean
    hls_url: string | null
    hls_listeners: number
  }
  listeners: {
    total: number
    unique: number
    current: number
  }
  live: {
    is_live: boolean
    streamer_name: string
    broadcast_start: number | null
    art: unknown
  }
  now_playing: {
    sh_id: number
    played_at: number
    duration: number
    playlist: string
    streamer: string
    is_request: boolean
    song: Song
    elapsed: number
    remaining: number
  }
}

export interface Page {
  name: string
  route: string
}

export interface Theme {
  variant?: 'dark' | 'light'
}

export interface IRCSource {
  name: string
  url: string
}
