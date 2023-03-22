import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data:[],
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
            console.log("action param",action);
            state.isLoading = false;
            state.data = action.payload.products;
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