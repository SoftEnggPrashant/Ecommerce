import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data:[],
    totalProducts: 0,
    isLoading: false,
    error: null,
};

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        fetchProductStart: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchProductSuccess: (state, action) => {
            state.isLoading = false;
            state.data = action.payload.products;
            state.totalProducts = action.payload.productCount;
            state.error = null;
        },
        fetchProductFail: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
});

export const { fetchProductStart, fetchProductSuccess, fetchProductFail } = productSlice.actions;

export default productSlice.reducer;