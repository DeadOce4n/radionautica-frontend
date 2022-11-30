import React from 'react'
import Content from '../components/Content/Content'
import { Link } from 'gatsby'
import type { HeadFC, PageProps } from 'gatsby'
import { BASE_TITLE } from '../utils/constants'

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Content className="narrow">
      <h1>Oops! Página no encontrada 😔</h1>
      <p>
        Pero no te desanimes, haz click <Link to="/">aquí</Link> para volver a
        la página anterior.
      </p>
    </Content>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => (
  <>
    <title>{`Página no encontrada | ${BASE_TITLE}`}</title>
    <meta
      name="description"
      content="Escucha la mejor música y chatea gratis con gente de todo el mundo 🌐 Pide tus canciones favoritas 🎶 ! Navega con nosotros en un océano musical 🌊"
    />
  </>
)
