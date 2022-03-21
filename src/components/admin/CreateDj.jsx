import { navigate } from 'gatsby'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { createDj } from '../../services/djs'
import AppContext from '../AppContext'
import Button from '../Button'
import Content from '../Content'
import Form from '../form/Form'
import Icofont from '../Icofont'
import Switch from './Switch'
import Title from './Title'
import Seo from '../Seo'

const NarrowForm = styled(Form)`
  width: min(90%, 52rem);
  margin-inline: auto;
  margin-top: 0 !important;
  h1 { margin-top: 0 !important; }
  margin-bottom: 6rem;
`

const StyledSwitch = styled(Switch)`
  position: relative;
  top: 0;
  left: 0;
`

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border-radius: 50%;
  label {
    width: 64px;
    height: 64px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.1s;
  }
  span {
    font: 700 2rem var(--font-secondary);
    color: var(--color-fg-accent-${props => props.theme.theme});
  }
  img {
    width: 64px;
    height: 64px;
    overflow: hidden;
    object-fit: cover;
    aspect-ratio: 1/1;
    border-radius: 50%;
  }
  label:hover { transform: scale(1.2); }
`

const CreateDj = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      nick: '',
      password: '',
      isActive: true,
      avatar: null
    }
  })
  const [avatarUrl, setAvatarUrl] = useState('')
  const { user, setNotification } = useContext(AppContext)

  const onSubmit = async data => {
    const {
      nick,
      password,
      isActive
    } = data
    try {
      await createDj({
        nick,
        password,
        isActive,
        avatar: data.avatar[0],
        token: user.token,
        radioApiKey: user.radioApiKey
      })
      setNotification({ message: `Usuario ${nick} registrado correctamente.`, error: false })
      setTimeout(() => {
        setNotification({ message: '', error: false })
      }, 3000)
      navigate('/admin/djs')
    } catch (e) {
      console.log(e)
      setNotification({ message: 'Oops! Ocurrió un error 😔', error: true })
      setTimeout(() => {
        setNotification({ message: '', error: false })
      }, 3000)
    }
  }

  const onAvatarChange = event => {
    if (event.target.files.length > 0) {
      const newAvatarUrl = URL.createObjectURL(event.target.files[0])
      setAvatarUrl(newAvatarUrl)
    }
  }

  return (
    <>
      <Seo title='Registrar nuevo DJ' />
      <Content className='narrow '>
        <Title title='' backTo='/admin/djs' />
        <NarrowForm
          onSubmit={handleSubmit(onSubmit)}
          title='Registrar nuevo DJ'
        >
          <label htmlFor='nick'>Nick:</label>
          <input type='text' {...register('nick', { required: true })} />
          <label htmlFor='password'>Contraseña:</label>
          <input type='password' {...register('password', { required: true })} />
          <AvatarContainer>
            <span>Avatar:</span>
            <label htmlFor='avatar'>
              {avatarUrl
                ? <img src={avatarUrl} alt='Avatar de DJ' />
                : <div><Icofont className='icofont-ui-camera icofont-3x' /></div>}
            </label>
          </AvatarContainer>
          <input
            id='avatar'
            type='file'
            accept='image/*'
            {...register('avatar', { onChange: onAvatarChange, required: true })}
          />
          <label htmlFor='isActive'>Activo por defecto:</label>
          <StyledSwitch>
            <input type='checkbox' {...register('isActive')} />
            <span className='slider' />
          </StyledSwitch>
          <Button type='submit' primary>Registrar</Button>
        </NarrowForm>
      </Content>
    </>
  )
}

export default CreateDj
