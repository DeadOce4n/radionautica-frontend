import { navigate } from 'gatsby'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { createPost } from '../../services/posts'
import AppContext from '../AppContext'
import Button from '../Button'
import Content from '../Content'
import Form from '../form/Form'
import Title from './Title'
import dayjs from 'dayjs'

const CreatePost = () => {
  const currentDatetime = dayjs()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: '',
      content: '',
      date: currentDatetime.format('YYYY-MM-DD'),
      time: currentDatetime.format('HH:mm')
    }
  })
  const { user, setNotification } = useContext(AppContext)

  const onSubmit = async data => {
    try {
      const body = {
        data: {
          ...data,
          author: user.id
        }
      }
      await createPost(body, user.token)
      setNotification({ message: 'Publicación creada correctamente.', error: false })
      setTimeout(() => {
        setNotification({ message: '', error: false })
      }, 3000)
      navigate('/admin/posts')
    } catch (e) {
      console.log(e)
      setNotification({ message: 'Oops! Ocurrió un error 😔', error: true })
      setTimeout(() => {
        setNotification({ message: '', error: false })
      }, 3000)
    }
  }

  return (
    <>
      <Content className='narrow'>
        <Title backTo='/admin/posts' />
        <Form onSubmit={handleSubmit(onSubmit)} title='Crear nueva publicación'>
          <label htmlFor='title'>Título:</label>
          <input type='text' {...register('title', { required: true })} />
          <label htmlFor='content'>Contenido:</label>
          <textarea rows='10' {...register('content', { required: true })} />
          <label htmlFor='date'>¿En qué fecha se realizará?</label>
          <input type='date' {...register('date', { required: true })} />
          <label htmlFor='time'>¿A qué hora?</label>
          <input type='time' {...register('time', { required: true })} />
          <Button type='submit' primary>Guardar</Button>
        </Form>
      </Content>
    </>
  )
}

export default CreatePost
