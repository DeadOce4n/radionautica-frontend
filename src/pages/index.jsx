import React from 'react'
import Content from '../components/Content'
import Seo from '../components/Seo'
import TabbedIFrame from '../components/TabbedIFrame'

const Index = () => {
  const iframeSources = [
    { name: 'SupraChat', url: 'https://suprachat.net/webchat?channel=#radionautica,#chat' },
    { name: 'ChatZona', url: 'https://chat.chatzona.org/index.html#nick=&channel=#radionautica,#chat' }
  ]
  return (
    <>
      <Seo
        titleTemplate='%s'
      />
      <Content>
        <TabbedIFrame sources={iframeSources} main='SupraChat' />
      </Content>
    </>
  )
}

export default Index
