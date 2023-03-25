import { configureStore, } from '@reduxjs/toolkit';
import productSlice  from './Reducers/ProductReducer';
import userSlice from "./Reducers/UserReducer"

export const store = configureStore({
  reducer: {
    product: productSlice,
    user:userSlice,
  },
})