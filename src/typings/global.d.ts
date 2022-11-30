declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      GATSBY_AZURACAST_URL: string
      GATSBY_STATION_NAME: string
      GATSBY_KIWIIRC_SERVERS: string
      GATSBY_RADIO_SRC: string
      GATSBY_NOWPLAYING_URL: string
    }
  }
}

declare module 'styled-components' {
  export interface DefaultTheme {
    variant: 'dark' | 'light'
  }
}

export {}
