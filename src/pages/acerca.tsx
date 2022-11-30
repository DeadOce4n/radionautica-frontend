import React from 'react'
import Content from '../components/Content/Content'
import { StaticImage } from 'gatsby-plugin-image'
import type { HeadFC, PageProps } from 'gatsby'
import { BASE_TITLE } from '../utils/constants'

const AboutPage: React.FC<PageProps> = () => {
  return (
    <Content className="narrow">
      <h1>Acerca de Radionautica</h1>
      <p>
        Radionautica es una radio en línea donde podrás escuchar la mejor
        música, pedir tus canciones favoritas y chatear con personas de todo el
        mundo. Nuestros chats son cortesía de{' '}
        <a href="https://suprachat.net">SupraChat</a> y de{' '}
        <a href="https://chatzona.org">ChatZona</a>, por favor visítalos!
      </p>
      <p>
        Somos una radio independiente sin fines de lucro, con un equipo que
        dedica parte de su tiempo al proyecto con la única finalidad de hacerlos
        pasar un buen rato, somos una radio del pueblo y para el pueblo!
      </p>
      <h2>Acompáñanos y navega con nosotros en un océano musical 🌊</h2>
      <StaticImage
        src="../images/sea.webp"
        alt="Foto de Sebastian Voortman en Pexels"
        layout="fullWidth"
        placeholder="blurred"
      />
    </Content>
  )
}

export default AboutPage

export const Head: HeadFC = () => (
  <>
    <title>{`Acerca de Radionautica | ${BASE_TITLE}`}</title>
    <meta
      name="description"
      content="Radionautica es una radio en línea donde podrás escuchar la mejor música, pedir tus canciones favoritas y chatear con personas de todo el mundo."
    />
  </>
)
