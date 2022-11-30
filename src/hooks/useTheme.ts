import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface ThemeState {
  variant: 'dark' | 'light'
  toggle: () => void
  setVariant: (variant: 'dark' | 'light') => void
}

export default create<ThemeState>()(
  devtools(
    persist((set, get) => ({
      variant: 'dark',
      toggle: () =>
        set({ variant: get().variant === 'dark' ? 'light' : 'dark' }),
      setVariant: (variant) => set({ variant }),
    }))
  )
)
