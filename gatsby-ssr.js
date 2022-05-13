import React from 'react'
import Layout from './src/components/Layout'
import { Provider } from 'react-redux'
import createStore from './src/store'

export const wrapPageElement = ({ element }) => {
  const store = createStore()

  return (
    <Provider store={store}>
      <Layout>{element}</Layout>
    </Provider>
  )
}
