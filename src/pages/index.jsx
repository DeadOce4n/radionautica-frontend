import React from 'react'
import Content from '../components/Content'
import Seo from '../components/Seo'
import TabbedIFrame from '../components/TabbedIFrame'

const Index = () => {
  const iframeSources = [
    { name: 'SupraChat', url: 'https://suprachat.net/webchat?channel=#radionautica,#chat' },
    { name: 'ChatZona', url: 'https://chat.chatzona.org/index.html#nick=&channel=#radionautica,#hieloysal,#leon' }
  ]
  return (
    <>
      <Seo
        title='Radio en línea, escucha música y chatea GRATIS'
        description='Escucha la mejor música y chatea gratis con gente de todo el mundo 🌐 Pide tus canciones favoritas 🎶 ! Navega con nosotros en un océano musical 🌊'
      />
      <Content>
        <TabbedIFrame sources={iframeSources} main='SupraChat' />
      </Content>
    </>
  )
}

export default Index
