import * as React from 'react'
import Content from '../components/Content/Content'
import type { HeadFC, PageProps } from 'gatsby'
import type { IRCSource } from '../typings/index'
import TabbedIFrame from '../components/TabbedIFrame/TabbedIFrame'
import { BASE_TITLE } from '../utils/constants'

const iframeSources: IRCSource[] = JSON.parse(
  process.env.GATSBY_KIWIIRC_SERVERS
)

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Content>
      <TabbedIFrame sources={iframeSources} main="SupraChat" />
    </Content>
  )
}

export default IndexPage

export const Head: HeadFC = () => (
  <>
    <title>
      {`Radio en línea, escucha música y chatea GRATIS | ${BASE_TITLE}`}
    </title>
    <meta
      name="description"
      content="Escucha la mejor música y chatea gratis con gente de todo el mundo 🌐 Pide tus canciones favoritas 🎶 ! Navega con nosotros en un océano musical 🌊"
    />
  </>
)
