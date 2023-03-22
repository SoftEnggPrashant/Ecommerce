import { configureStore } from '@reduxjs/toolkit';
import productSlice  from './Reducers/ProductReducer';

export const store = configureStore({
  reducer: {
    product: productSlice,    
  },
})