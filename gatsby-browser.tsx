import React from 'react'
import Layout from './src/components/Layout/Layout'
import QueryClientProvider from './src/components/Layout/QueryClientProvider'

export const wrapPageElement = ({ element }) => <Layout>{element}</Layout>
export const wrapRootElement = ({ element }) => (
  <QueryClientProvider>{element}</QueryClientProvider>
)
