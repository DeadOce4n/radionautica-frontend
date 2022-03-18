import { Link } from 'gatsby'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { checkDjExistsOnStrapi, createDjStrapiOnly, getDjs, updateDj, updateDjAvatar } from '../../services/djs'
import AppContext from '../AppContext'
import Content from '../Content'
import Icofont from '../Icofont'
import Loader from '../Loader'
import Switch from './Switch'
import Title from './Title'

const DjCardContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  margin-top: 3rem;
  justify-content: center;
`

const DjCard = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  gap: 3rem;
  background-color: var(--color-bg-${props => props.theme.theme}-alt);
  padding: 4rem 4rem;
  border-radius: 15px;
  filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.2));
  transition: transform 0.1s;
  @media only screen and (min-width: 80em) {
    flex-basis: 47%;
  }
  &:hover { transform: scale(1.05); }
`

const DjAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  img {
    width: 64px;
    height: 64px;
    overflow: hidden;
    object-fit: cover;
    aspect-ratio: 1/1;
    border-radius: 50%;
  }
  label {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s;
  }
  label:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
`

const DjInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  .nick {
    font: 700 2.5rem var(--font-player);
  }
`

const SearchBar = styled.input`
  position: relative;
  appearance: none;
  font-size: 2rem;
  color: var(--color-bg-${props => props.theme.theme});
  background-color: var(--color-fg-${props => props.theme.theme});
  border: none;
  border-radius: 10px;
  padding: 0.75rem 1.5rem;
  align-self: center;
  width: 100%;
  &:focus { outline: none; }
  @media only screen and (min-width: 60em) {
    align-self: flex-end;
    width: unset;
  }
`

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  gap: 2rem;
`

const PlusButton = styled(Link)`
  transition: all 0.1s;
  &:hover { transform: scale(1.2); }
`

const Djs = () => {
  const [djs, setDjs] = useState([])
  const [filter, setFilter] = useState('')
  const { user, setNotification } = useContext(AppContext)

  const handleToggleStatus = async id => {
    const currentDj = djs.find(dj => dj.id === id)
    try {
      await updateDj(id, user.radioApiKey, null, !currentDj.isActive)
      const currentDjIndex = djs.findIndex(dj => dj.id === id)
      const updatedDj = { ...djs[currentDjIndex], isActive: !currentDj.isActive }
      const updatedDjs = [...djs]
      updatedDjs.splice(currentDjIndex, 1, updatedDj)
      setDjs(updatedDjs)
    } catch (e) {
      console.log(e)
    }
  }

  const handleFilter = event => {
    const newFilter = event.target.value
    setFilter(newFilter)
  }

  useEffect(() => {
    (async () => {
      try {
        const djs = await getDjs(user.radioApiKey)
        setDjs(djs)
      } catch (e) {
        console.log(e)
        setNotification({ message: 'Oops! Ocurrió un error 😔', error: true })
        setTimeout(() => {
          setNotification({ message: '', error: false })
        }, 3000)
      }
    })()
  }, [])

  const onAvatarChange = async (event, nick) => {
    const avatar = event.target.files[0]
    try {
      const djExistsOnStrapi = await checkDjExistsOnStrapi(nick)
      if (!djExistsOnStrapi.exists) {
        createDjStrapiOnly({ nick, avatar, token: user.token })
      } else {
        const newAvatar = await updateDjAvatar(djExistsOnStrapi.id, avatar, user.token)
        const currentDjIndex = djs.findIndex(dj => dj.nick === nick)
        const updatedDj = { ...djs[currentDjIndex], avatar: newAvatar }
        const updatedDjs = [...djs]
        updatedDjs.splice(currentDjIndex, 1, updatedDj)
        setDjs(updatedDjs)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const djRenderFunction = dj => (
    <DjCard key={dj.id}>
      <Switch>
        <input
          type='checkbox'
          defaultChecked={dj.isActive}
          onChange={() => handleToggleStatus(dj.id)}
        />
        <span className='slider' />
      </Switch>
      <DjAvatar>
        <label htmlFor={`avatar-${dj.id}`}>
          {dj.avatar
            ? <img src={`${process.env.GATSBY_API_URL}${dj.avatar}`} alt={`Avatar de ${dj.nick}`} />
            : <div><Icofont className='icofont-ui-camera icofont-3x' /></div>}
        </label>
        <input
          style={{ display: 'none' }}
          id={`avatar-${dj.id}`}
          type='file'
          accept='image/*'
          onChange={event => onAvatarChange(event, dj.nick)}
        />
      </DjAvatar>
      <DjInfo>
        <span className='nick'>{dj.nick}</span>
        <span>{`Cuenta ${dj.isActive ? 'activa' : 'desactivada'}`}</span>
      </DjInfo>
    </DjCard>
  )

  return (
    <>
      <Content className='narrow'>
        <Title title='Gestionar DJs' backTo='/admin' />
        <Controls>
          <PlusButton to='/admin/djs/registrar'>
            <Icofont className='icofont-plus-circle icofont-2x' />
          </PlusButton>
          <SearchBar
            type='text'
            onChange={handleFilter}
            value={filter}
            placeholder='Buscar...'
          />
        </Controls>
        <DjCardContainer>
          {djs.length > 0
            ? djs.filter(dj => {
                if (!filter) return true
                return dj.nick.toLowerCase().includes(filter.toLowerCase())
              }).map(djRenderFunction)
            : <Loader />}
        </DjCardContainer>
      </Content>
    </>
  )
}

export default Djs
