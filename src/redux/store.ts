import { configureStore } from '@reduxjs/toolkit'
import usersSlice from './Functions/UsersState'
import productSlice from './Functions/ProductState'

export const store = configureStore({
  reducer: {
    users: usersSlice,
    products: productSlice,
  },
})