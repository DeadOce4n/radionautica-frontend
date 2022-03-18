import { navigate } from 'gatsby'
import React, { useContext, useLayoutEffect } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import storageAvailable from '../../utils/storageAvailable'
import AppContext from '../AppContext'
import Button from '../Button'
import Content from '../Content'
import Form from '../form/Form'
import Title from './Title'

const LoginForm = styled(Form)`
  width: min(90%, 50rem);
  margin-inline: auto;
  margin-top: 0 !important;
  h1 { margin-top: 0 !important; }
`

const Login = () => {
  const { register, handleSubmit } = useForm()
  const { user, setUser, notification, setNotification } = useContext(AppContext)

  const onSubmit = async data => {
    try {
      const response = await window.fetch(`${process.env.GATSBY_API_URL}/api/auth/local`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data })
      })
      if (!response.ok) throw new Error(response.status)
      const userData = await response.json()
      const user = {
        id: userData.user.id,
        nick: userData.user.username,
        token: userData.jwt,
        isAuthed: true,
        radioApiKey: userData.user.azuracastApiKey
      }
      setUser(user)
      setNotification({ message: `Bienvenidx, ${user.nick}`, error: false })
      if (storageAvailable('localStorage')) {
        window.localStorage.setItem('user', JSON.stringify(user))
      }
      setTimeout(() => {
        setNotification({ ...notification, message: '' })
      }, 3000)
      navigate('/admin')
    } catch (e) {
      console.log(e)
    }
  }

  useLayoutEffect(() => {
    if (user.isAuthed) {
      navigate('/admin')
    }
  })

  return (
    <>
      <Content className='narrow'>
        <Title backTo='/' />
        <LoginForm onSubmit={handleSubmit(onSubmit)} title='Iniciar sesión'>
          <label htmlFor='identifier'>Nick:</label>
          <input type='text' {...register('identifier', { required: true })} />
          <label htmlFor='password'>Contraseña:</label>
          <input type='password' {...register('password', { required: true })} />
          <Button type='submit' primary>Iniciar sesión</Button>
        </LoginForm>
      </Content>
    </>
  )
}

export default Login
