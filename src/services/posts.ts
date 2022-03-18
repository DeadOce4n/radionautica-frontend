import qs from 'qs'

interface Post {
  id?: number,
  title: string,
  content: string,
  author?: number,
  date?: string,
  createdAt?: string
}

export const getPost = async (id: number): Promise<Post> => {
  const query = qs.stringify({
    populate: 'author'
  }, {
    encodeValuesOnly: true
  })
  const response = await fetch(`${process.env.GATSBY_API_URL}/api/posts/${id}?${query}`)

  if (!response.ok) throw new Error(`An error ocurred: ${response.status}`)

  const rawPost = await response.json()
  const post: Post = {
    id: rawPost.data.id,
    title: rawPost.data.attributes.title,
    content: rawPost.data.attributes.content,
    author: rawPost.data.attributes.author.data.attributes.username,
    createdAt: rawPost.data.attributes.createdAt,
    date: rawPost.data.attributes.date
  }
  return post
}

export const getPosts = async (): Promise<Post[]> => {
  const query = qs.stringify({
    populate: 'author',
    sort: ['createdAt:desc']
  }, {
    encodeValuesOnly: true
  })
  const response = await fetch(`${process.env.GATSBY_API_URL}/api/posts?${query}`)

  if (!response.ok) throw new Error(`An error ocurred: ${response.status}`)

  const rawPosts = await response.json()
  const posts = rawPosts.data.map(post => {
    const _post: Post = {
      id: post.id,
      title: post.attributes.title,
      content: post.attributes.content,
      author: post.attributes.author.data.attributes.username,
      date: post.attributes.date,
      createdAt: post.attributes.createdAt
    }
    return _post
  })
  return posts
}

export const createPost = async (data: Post, token: string): Promise<Post> => {
  const response = await fetch(`${process.env.GATSBY_API_URL}/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  if (!response.ok) throw new Error(`An error ocurred: ${response.status}`)
  const returnedPost = await response.json()
  const post: Post = {
    id: returnedPost.data.id,
    title: returnedPost.data.attributes.title,
    content: returnedPost.data.attributes.title,
    author: data.author,
    date: returnedPost.data.createdAt
  }
  return post
}

export const updatePost = async (
  postId: number,
  data: Post,
  userId: number,
  token: string
) => {
  const response = await fetch(`${process.env.GATSBY_API_URL}/api/posts/${postId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ data: { ...data, updatedBy: userId } })
  })

  if (!response.ok) throw new Error(`An error ocurred: ${response.status}`)

  const rawReturnedPost = await response.json()
  const post: Post = {
    title: rawReturnedPost.data.attributes.title,
    content: rawReturnedPost.data.attributes.content
  }
  return post
}

export const deletePost = async (id: number, token: string) => {
  const response = await fetch(`${process.env.GATSBY_API_URL}/api/posts/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `bearer ${token}`
    }
  })

  if (!response.ok) throw new Error(`An error ocurred: ${response.status}`)

  const json = await response.json()
  const returnedId = json.data.id
  return returnedId
}

export const isKaraokeScheduled = async (): Promise<any> => {
  const query = qs.stringify({
    fields: ['date'],
    filters: {
      date: {
        $gt: new Date(Date.now()).toISOString()
      }
    }
  })
  const response = await window.fetch(`${process.env.GATSBY_API_URL}/api/posts?${query}`)

  if (!response.ok) throw new Error(`An error ocurred: ${response.status}`)

  const data = await response.json()

  if (data.data.length === 0) return null

  return data.data[0]
}
