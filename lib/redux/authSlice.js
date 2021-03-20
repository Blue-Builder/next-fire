import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
    currentUsername: null
  },
  reducers: {
    updateUser: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.currentUser = action.payload
    },
    updateUsername: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.currentUsername = action.payload
    }
  }
})

export const { updateUser, updateUsername } = authSlice.actions

export const selectUser = (state) => state.auth.currentUser
export const selectUsername = (state) => state.auth.currentUsername

export default authSlice.reducer
