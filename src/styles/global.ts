import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle<{ theme: { variant: 'dark' | 'light' } }>`
  body {
    color: var(--color-fg-${(props) => props.theme.variant});
    background-color: var(--color-bg-${(props) => props.theme.variant});
  }
  h1, h2, h3, a {
    color: var(--color-fg-accent-${(props) => props.theme.variant});
  }
  pre, code {
    color: var(--color-bg-${(props) => props.theme.variant});
    background-color: var(--color-fg-${(props) => props.theme.variant});
`
