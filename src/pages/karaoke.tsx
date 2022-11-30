import React from 'react'
import Content from '../components/Content/Content'
import type { HeadFC, PageProps } from 'gatsby'
import { BASE_TITLE } from '../utils/constants'

const KaraokePage: React.FC<PageProps> = () => {
  return (
    <Content className="narrow">
      <h1>Karaoke</h1>
      <p>Lo sentimos, esta sección aún no está lista, vuelve otro día!</p>
    </Content>
  )
}

export default KaraokePage

export const Head: HeadFC = () => (
  <>
    <title>{`Karaoke | ${BASE_TITLE}`}</title>
    <meta
      name="description"
      content="Aquí podrás enterarte sobre las fechas de nuestro karaoke y leer sobre las ediciones anteriores"
    />
  </>
)
