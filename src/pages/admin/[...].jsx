import { Router } from '@reach/router'
import { Link } from 'gatsby'
import React from 'react'
import CreateDj from '../../components/admin/CreateDj'
import CreatePost from '../../components/admin/CreatePost'
import Dashboard from '../../components/admin/Dashboard'
import Djs from '../../components/admin/Djs'
import Login from '../../components/admin/Login'
import Post from '../../components/admin/Post'
import Posts from '../../components/admin/Posts'
import PrivateRoute from '../../components/PrivateRoute'

const Default = () => (
  <>
    <p>Lo sentimos, no hay nada aquí!</p>
    <Link to='/admin'>Volver a la pantalla principal...</Link>
  </>
)

const Admin = () => {
  return (
    <Router style={{ width: '100%' }} basepath='/admin'>
      <Login path='/login' />
      <PrivateRoute path='/' component={Dashboard} />
      <PrivateRoute path='/posts' component={Posts} />
      <PrivateRoute path='/posts/:postId' component={Post} />
      <PrivateRoute path='/posts/crear' component={CreatePost} />
      <PrivateRoute path='/djs' component={Djs} />
      <PrivateRoute path='/djs/registrar' component={CreateDj} />
      <Default path='/oops' default />
    </Router>
  )
}

export default Admin
