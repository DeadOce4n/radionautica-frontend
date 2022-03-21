import { navigate } from 'gatsby'
import React, { useContext } from 'react'
import styled from 'styled-components'
import storageAvailable from '../../utils/storageAvailable'
import AppContext from '../AppContext'
import Content from '../Content'
import Icofont from '../Icofont'
import Title from './Title'
import Seo from '../Seo'

const SectionContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 6rem;
  margin-top: 4rem;
  justify-content: center;
`

const SectionCard = styled.div`
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: space-evenly;
  padding: 4rem 3rem;
  width: 40rem;
  background-color: var(--color-bg-${props => props.theme.theme}-alt);
  border-radius: 15px;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
  cursor: pointer;
  transition: transform 0.1s;
  &:active { 
    transform: scale(0.95);
  }
  span {
    font: 700 3rem var(--font-player);
  }
  &:hover { transform: scale(1.05); }
`

const Dashboard = () => {
  const context = useContext(AppContext)

  const handleLogout = () => {
    context.setUser({ id: null, nick: null, token: null, isAuthed: false })
    if (storageAvailable('localStorage')) {
      window.localStorage.removeItem('user')
    }
  }

  return (
    <>
      <Seo title='Panel de administración' />
      <Content className='narrow'>
        <Title backTo='/' title={`Bienvenidx, ${context.user.nick}`} />
        <p>
          Aquí podrás crear registrar nuevos DJs para la radio y crear nuevas
          entradas para el karaoke!
        </p>
        <SectionContainer>
          <SectionCard onClick={() => navigate('/admin/djs')}>
            <Icofont className='icofont-radio-mic icofont-4x' />
            <span>Gestionar DJs</span>
          </SectionCard>
          <SectionCard onClick={() => navigate('/admin/posts')}>
            <Icofont className='icofont-microphone icofont-4x' />
            <span>Gestionar karaoke</span>
          </SectionCard>
          <SectionCard onClick={handleLogout}>
            <Icofont className='icofont-exit icofont-4x' />
            <span>Cerrar sesión</span>
          </SectionCard>
        </SectionContainer>
      </Content>
    </>
  )
}

export default Dashboard
