import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getDjs } from '../services/djs'
import Loader from './Loader'

const Container = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  max-height: ${props => props.visible ? '1000rem' : '25rem'};
  overflow-y: hidden;
  transition: all 1s;
  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    background: linear-gradient(transparent, var(--color-bg-${props => props.theme.theme}));
    pointer-events: none;
    transition: all 1s;
  }
  &:hover::before { background: none; }
  h2 { flex-basis: 100%; padding: 0 3rem 0; }
`

const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin: 1rem;
  img {
    width: 64px;
    height: 64px;
    overflow: hidden;
    object-fit: cover;
    aspect-ratio: 1/1;
    border-radius: 50%;
  }
  &:hover { transform: scale(1.2); }
  transition: all 0.1s;
`

const DjContainer = () => {
  const [djs, setDjs] = useState([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    (async () => {
      const djs = await getDjs(process.env.GATSBY_RADIO_CLIENT_KEY)
      const activeDjs = djs.filter(dj => dj.isActive)
      if (activeDjs.some(dj => dj.avatar === null)) {
        setDjs(activeDjs.sort((a, b) => Number(!!b.avatar) - Number(!!a.avatar)))
      } else {
        setDjs(activeDjs)
      }
    })()
  }, [])

  if (djs.length === 0) {
    return <Loader />
  }

  return (
    <>
      <Container
        onMouseOver={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        visible={visible}
      >
        <h2>Nuestros DJs</h2>
        {djs.map(dj => (
          <Avatar key={dj.id}>
            <img
              src={`${process.env.GATSBY_API_URL}${dj.avatar || process.env.GATSBY_DEFAULT_AVATAR}`}
              alt={dj.nick}
              title={dj.nick}
            />
          </Avatar>
        ))}
      </Container>
    </>
  )
}

export default DjContainer
