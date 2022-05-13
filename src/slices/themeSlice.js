import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 'dark'
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggle: state => {
      state.value = state.value === 'dark' ? 'light' : 'dark'
    },
    setTheme: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { toggle, setTheme } = themeSlice.actions
export default themeSlice.reducer
