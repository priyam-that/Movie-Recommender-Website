import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'

export const store = configureStore({  //It provides a better developer experience with built-in defaults,  middleware setup.
  reducer: {
    user: userReducer     //managing the state such as login status, user details

  },
})


