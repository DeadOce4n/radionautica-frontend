import React from 'react'
import {
  QueryClient,
  QueryClientProvider as Provider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

interface Props {
  children: React.ReactNode
}

const QueryClientProvider = ({ children }: Props) => {
  return (
    <Provider client={queryClient}>
      <ReactQueryDevtools />
      {children}
    </Provider>
  )
}

export default QueryClientProvider
