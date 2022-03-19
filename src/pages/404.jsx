import React from 'react'
import { Link } from 'gatsby'
import Seo from '../components/Seo'
import Content from '../components/Content'

const NotFoundPage = () => (
  <>
    <Seo title='Oops! Página no encontrada 😔' />
    <Content className='narrow'>
      <h1>Oops! Página no encontrada 😔</h1>
      <p>Pero no te desanimes, haz click <Link to='/'>aquí</Link> para
        volver a la página anterior.
      </p>
    </Content>
  </>
)

export default NotFoundPage
