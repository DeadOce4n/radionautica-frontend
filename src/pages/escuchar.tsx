import React from 'react'
import Content from '../components/Content/Content'
import { StaticImage } from 'gatsby-plugin-image'
import type { HeadFC, PageProps } from 'gatsby'
import { BASE_TITLE } from '../utils/constants'

const ListenPage: React.FC<PageProps> = () => {
  return (
    <Content className="narrow">
      <h1>¿Cómo escucharnos por fuera?</h1>
      <p>
        Escucharnos a través de tu reproductor favorito es muy fácil! Sólo debes
        agregar la siguiente URL a tu reproductor favorito, ya sea{' '}
        <a href="https://winamp.com">Winamp</a>,{' '}
        <a href="http://aimp2.us/aimp3-download.php">AIMP3</a>, o{' '}
        <a href="https://videolan.org/vlc">VLC</a>:
      </p>
      <pre>
        <code>https://radionautica.xyz/radio/8000/radio.mp3</code>
      </pre>
      <p>
        A continuación te mostramos un ejemplo de cómo hacerlo con el
        reproductor VLC Player:
      </p>
      <StaticImage
        src="../images/vlc-1.png"
        alt="Primer paso para escucharnos por VLC."
        layout="fullWidth"
        placeholder="blurred"
      />
      <StaticImage
        src="../images/vlc-2.png"
        alt="Segundo paso para escucharnos por VLC."
        layout="fullWidth"
        placeholder="blurred"
      />
    </Content>
  )
}

export default ListenPage

export const Head: HeadFC = () => (
  <>
    <title>{`¿Cómo escucharnos por fuera? | ${BASE_TITLE}`}</title>
    <meta
      name="description"
      content="Sigue estas instrucciones si quieres escuchar nuestra radio a través de tu reproductor favorito!"
    />
  </>
)
