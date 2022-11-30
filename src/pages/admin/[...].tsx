import React from 'react'
import { Router } from '@reach/router'
import { Link } from 'gatsby'
import Content from '../../components/Content/Content'

interface DefaultProps {
  default: boolean
  path: string
}

const Default = (props: DefaultProps) => (
  <>
    <Content className="narrow">
      <h1>Lo sentimos, aún no hay nada aquí!</h1>
      <Link to="/">Volver a la pantalla principal</Link>
    </Content>
  </>
)

const Admin = () => {
  return (
    <Router style={{ width: '100%' }} basepath="/admin">
      <Default path="/oops" default />
    </Router>
  )
}

export default Admin
