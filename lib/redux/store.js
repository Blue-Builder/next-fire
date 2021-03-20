import authReducer from '@lib/redux/authSlice'
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: { auth: authReducer }
})
