import { navigate } from 'gatsby'
import React, { useContext } from 'react'
import AppContext from './AppContext'

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const { user } = useContext(AppContext)
  if (!user.isAuthed && location.pathname !== '/admin/login') {
    navigate('/admin/login')
    return null
  }
  return <Component {...rest} />
}

export default PrivateRoute
