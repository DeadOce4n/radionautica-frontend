import { navigate } from 'gatsby'
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { getPost, updatePost } from '../../services/posts'
import AppContext from '../AppContext'
import Button from '../Button'
import Content from '../Content'
import Form from '../form/Form'
import Title from './Title'
import dayjs from 'dayjs'
import Seo from '../Seo'

const Post = ({ postId }) => {
  const { user, setNotification } = useContext(AppContext)
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: '',
      content: '',
      date: '',
      time: ''
    }
  })

  useEffect(() => {
    (async () => {
      const post = await getPost(postId)
      setValue('title', post.title)
      setValue('content', post.content)
      const datetime = dayjs(post.date)
      setValue('date', datetime.format('YYYY-MM-DD'))
      setValue('time', datetime.format('HH:mm'))
    })()
  }, [])

  const onSubmit = async data => {
    const datetime = dayjs(`${data.date} ${data.time}`)
    try {
      await updatePost(postId, { ...data, date: datetime.toISOString() }, user.id, user.token)
      setNotification({
        message: 'Se actualizó correctamente la publicación.',
        error: false
      })
      setTimeout(() => {
        setNotification({
          message: '',
          error: false
        })
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
      <Seo title='Editar post' />
      <Content className='narrow'>
        <Title backTo='/admin/posts' />
        <Form onSubmit={handleSubmit(onSubmit)} title='Editar post'>
          <label htmlFor='title'>Título</label>
          <input type='text' {...register('title', { required: true })} />
          <label htmlFor='content'>Contenido:</label>
          <textarea rows='10' {...register('content', { required: true })} />
          <label htmlFor='date'>¿En qué fecha se realizará?</label>
          <input type='date' {...register('date', { required: true })} />
          <label htmlFor='time'>¿A qué hora?</label>
          <input type='time' {...register('time', { required: true })} />
          <Button type='submit' primary>Guardar cambios</Button>
        </Form>
      </Content>
    </>
  )
}

export default Post
