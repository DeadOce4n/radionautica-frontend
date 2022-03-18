import dayjs from 'dayjs'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'

const StyledArticle = styled.article`
  border-bottom: 1px solid var(--color-fg-accent-${props => props.theme.theme});
  margin: 0 0 4rem 1rem;
  p { margin-left: 0; }
  .post-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .post-info {
    font-size: 0.75em;
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
  }
  .post-buttons { display: flex; gap: 1rem; }
`

const Article = ({ title, date, author, content, buttons, createdAt }) => {
  return (
    <StyledArticle>
      <h2>{title}</h2>
      <h3>Fecha del karaoke: {dayjs(date).format('DD/MM/YYYY hh:mmA')}</h3>
      <div className='post-header'>
        <div className='post-info'>
          <span>{author}</span>
          <span>{dayjs(createdAt).format('DD/MM/YYYY')}</span>
        </div>
        <div className='post-buttons'>
          {buttons}
        </div>
      </div>
      <ReactMarkdown>{content}</ReactMarkdown>
    </StyledArticle>
  )
}

export default Article
