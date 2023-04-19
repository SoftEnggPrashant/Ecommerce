import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productDetail: {},
  isLoading: true,
  reviewSubmited: false,
  reviewDeleted:false,
  error: null,
};

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    getProductDetailStart: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    getProductDetailSuccess: (state, action) => {
      state.isLoading = false;
      state.productDetail = action.payload;
      state.error = null;
    },
    getProductDetailError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    reviewSubmiteRequest: (state, action) => {
      state.reviewSubmited = true;
    },
    reviewSubmiteRequestSuccess: (state, action) => {
      state.reviewSubmited = false;
    },
    reviewDeleteRequest:(state,action) =>{
      state.reviewDeleted = true;
    },
    reviewDeleteRequestSuccess:(state, action) =>{
      state.reviewDeleted = false;
    }
  },
});

export const {
  getProductDetailError,
  getProductDetailSuccess,
  getProductDetailStart,
  reviewSubmiteRequest,
  reviewSubmiteRequestSuccess,
  reviewDeleteRequest,
  reviewDeleteRequestSuccess,
} = productDetailSlice.actions;
export default productDetailSlice.reducer;
