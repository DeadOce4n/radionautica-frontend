import qs from 'qs'

interface Dj {
  id: number,
  nick: string,
  isActive: boolean
}

export const getDjs = async (radioApiKey: string): Promise<any[]> => {
  const response = await fetch(`${process.env.GATSBY_RADIO_API_URL}/streamers`, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': radioApiKey
    }
  })

  if (!response.ok) throw new Error(`An error ocurred: ${response.status}`)

  const rawDjs = await response.json()
  const djs = rawDjs.map(dj => ({
    id: dj.id,
    nick: dj.streamer_username,
    isActive: dj.is_active
  }))

  const djsWithAvatar = djs.map(async dj => {
    const query = qs.stringify({
      filters: {
        nick: {
          $eq: dj.nick
        }
      },
      populate: 'avatar',
      encodeValuesOnly: true
    })
    const response = await fetch(`${process.env.GATSBY_API_URL}/api/djs?${query}`)
    const returnedDj = await response.json()
    const avatar = returnedDj.data[0]?.attributes.avatar.data?.attributes.url ||
      null
    return { ...dj, avatar }
  })

  return await Promise.all(djsWithAvatar)
}

export const getDj = async (id: number, radioApiKey: string): Promise<Dj> => {
  const response = await fetch(`${process.env.GATSBY_RADIO_API_URL}/streamer/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': radioApiKey
    }
  })

  if (!response.ok) throw new Error(`An error ocurred: ${response.status}`)

  const rawDj = await response.json()

  const dj: Dj = {
    id: rawDj.id,
    nick: rawDj.streamer_username,
    isActive: rawDj.is_active
  }

  return dj
}

export const createDj = async ({
  nick,
  password,
  isActive,
  avatar,
  token,
  radioApiKey
}: {
  nick: string,
  password: string,
  isActive: boolean,
  avatar: File,
  token: string,
  radioApiKey: string
}) => {
  const response = await fetch(`${process.env.GATSBY_RADIO_API_URL}/streamers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': radioApiKey
    },
    body: JSON.stringify({
      streamer_username: nick,
      streamer_password: password,
      display_name: nick,
      is_active: isActive
    })
  })

  if (!response.ok) throw new Error(`An error ocurred: ${response.status}`)

  const formData = new FormData()
  formData.append('data', JSON.stringify({ nick }))
  formData.append('files.avatar', avatar, avatar.name)

  const response2 = await fetch(`${process.env.GATSBY_API_URL}/api/djs`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  })

  if (!response2.ok) throw new Error(`An error ocurred: ${response2.status}`)

  const returnedDj = await response.json()
  const dj: Dj = {
    id: returnedDj.id,
    nick: returnedDj.streamer_username,
    isActive: returnedDj.is_active
  }
  return dj
}

export const createDjStrapiOnly = async ({
  nick,
  avatar,
  token
}: {
  nick: string,
  avatar: File,
  token: string
}) => {
  const formData = new FormData()
  formData.append('data', JSON.stringify({ nick }))
  formData.append('files.avatar', avatar, avatar.name)

  const response = await fetch(`${process.env.GATSBY_API_URL}/api/djs`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  })

  if (!response.ok) throw new Error(`An error ocurred: ${response.status}`)
}

export const checkDjExistsOnStrapi = async (
  nick: string
): Promise<{exists: boolean, id: number}> => {
  const query = qs.stringify({
    filters: {
      nick: {
        $eq: nick
      }
    },
    encodeValuesOnly: true
  })
  const response = await fetch(`${process.env.GATSBY_API_URL}/api/djs?${query}`)

  if (!response.ok) throw new Error(`An error ocurred: ${response.statusText}`)

  const data = await response.json()

  return { exists: data.data.length > 0, id: data.data[0].id }
}

export const updateDj = async (
  id: number,
  radioApiKey: string,
  passwd?: string,
  isActive?: boolean
) => {
  const body = {}

  if (passwd) {
    body.streamer_password = passwd
  }
  if (isActive !== undefined) {
    body.is_active = isActive
  }

  const response = await fetch(`${process.env.GATSBY_RADIO_API_URL}/streamer/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': radioApiKey
    },
    body: JSON.stringify(body)
  })

  const data = await response.json()

  if (!response.ok) throw new Error(`An error has ocurred: ${response.status}`)
}

export const updateDjAvatar = async (
  id: number,
  avatar: File,
  token: string
) => {
  const formData = new FormData()
  formData.append('files', avatar, avatar.name)

  const response = await fetch(`${process.env.GATSBY_API_URL}/api/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  })

  const data = await response.json()
  const imageId = data[0].id

  const formData2 = new FormData()
  formData2.append('data', JSON.stringify({ avatar: imageId }))

  await fetch(`${process.env.GATSBY_API_URL}/api/djs/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: formData2
  })
  return data[0].url
}
