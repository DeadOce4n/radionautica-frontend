import { Link, navigate } from 'gatsby'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { deletePost, getPosts } from '../../services/posts'
import AppContext from '../AppContext'
import Article from '../Article'
import Button from '../Button'
import Content from '../Content'
import Title from './Title'
import Seo from '../Seo'

const ArticleButton = styled(Button)`
  font-size: 0.75em;
  padding: 2px 5px;
  &:active { transform: scale(0.90); }
`

const Edit = () => {
  const [posts, setPosts] = useState([])
  const { user, setNotification } = useContext(AppContext)

  useEffect(() => {
    (async () => {
      const posts = await getPosts()
      setPosts(posts)
    })()
  }, [])

  const handleDelete = async id => {
    try {
      await deletePost(id, user.token)
      setPosts(posts.filter(post => post.id !== id))
      setNotification({ message: 'Publicación borrada correctamente.', error: false })
      setTimeout(() => {
        setNotification({ message: '', error: false })
      }, 3000)
    } catch (e) {
      console.log(e)
      setNotification({ message: 'Oops! Ocurrió un error 😔', error: true })
      setTimeout(() => {
        setNotification({ message: '', error: false })
      }, 3000)
    }
  }

  const DeleteButton = ({ id }) => (
    <ArticleButton onClick={() => handleDelete(id)}>Borrar</ArticleButton>
  )

  const handleUpdate = id => { navigate(`/admin/posts/${id}`) }

  const UpdateButton = ({ id }) => (
    <ArticleButton onClick={() => handleUpdate(id)}>Editar</ArticleButton>
  )

  if (posts.length === 0) {
    return (
      <>
        <Content className='narrow'>
          <Title title='Editar posts' backTo='/admin' />
          <p>Aún no hay nada aquí...</p>
          <Link to='/admin/posts/crear'>Crear un nuevo post...</Link>
        </Content>
      </>
    )
  }

  return (
    <>
      <Seo title='Editar posts' />
      <Content className='narrow'>
        <Title title='Editar posts' backTo='/admin' />
        {posts.map(post => (
          <React.Fragment key={post.id}>
            <Article
              id={post.id}
              title={post.title}
              content={post.content}
              author={post.author}
              date={post.date}
              buttons={[
                <UpdateButton key='update' id={post.id}>Editar</UpdateButton>,
                <DeleteButton key='delete' id={post.id}>Borrar</DeleteButton>
              ]}
            />
          </React.Fragment>
        ))}
        <Link to='/admin/posts/crear'>Crear un nuevo post...</Link>
      </Content>
    </>
  )
}

export default Edit
