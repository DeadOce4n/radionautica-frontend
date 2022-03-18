import React, { useEffect, useState, useContext } from 'react'
import Article from '../components/Article'
import Content from '../components/Content'
import { getPosts } from '../services/posts'
import AppContext from '../components/AppContext'

const Karaoke = () => {
  const [posts, setPosts] = useState([])
  const { setNotification } = useContext(AppContext)

  useEffect(() => {
    (async () => {
      try {
        const posts = await getPosts()
        setPosts(posts)
      } catch (e) {
        console.log(e)
        setNotification({ message: 'Oops! Ocurrió un error 😔', error: true })
        setTimeout(() => {
          setNotification({ message: '', error: false })
        }, 3000)
      }
    })()
  }, [])

  if (posts.length === 0) {
    return (
      <Content className='narrow'>
        <h1>Karaoke</h1>
        <p>Lo sentimos, aún no hay nada aquí 😔</p>
      </Content>
    )
  }

  return (
    <Content className='narrow'>
      <h1>Karaoke</h1>
      {posts.map(post => (
        <Article
          key={post.id}
          title={post.title}
          date={post.date}
          author={post.author}
          content={post.content}
          createdAt={post.createdAt}
        />
      ))}
    </Content>
  )
}

export default Karaoke
