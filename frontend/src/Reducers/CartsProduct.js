import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "Cart",
  initialState: {
    Carts: [],
    isLoading: false,
    error: null,
    isAddCart: false,
    isRemovedCart: false,
  },
  reducers: {
    getCartRequest: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    getCartRequestSuccess: (state, action) => {
      state.Carts = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getCartRequestFail: (state, action) => {
      state.Carts = [];
      state.error = action.payload;
      state.isLoading = false;
    },
    addCartRequest: (state, action) => {
      state.isAddCart = true;
    },
    addCartRequestSuccess: (state, action) => {
      state.isAddCart = false;
    },
    removeCartRequest:(state,action)=>{
      state.isRemovedCart = true;
    },
    removeCartRequestSuccess:(state,action)=>{
      state.isRemovedCart = false;
    }
  },
});

export const {
  getCartRequest,
  getCartRequestSuccess,
  getCartRequestFail,
  addCartRequest,
  addCartRequestSuccess,
  removeCartRequest,
  removeCartRequestSuccess
} = cartSlice.actions;

export default cartSlice.reducer;
