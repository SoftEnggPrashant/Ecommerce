import { createSlice } from "@reduxjs/toolkit";

export const adminProductsSlice = createSlice({
    name:'adminProduct',
    initialState:{
        products:[],
        isLoading:false,
        erorr : null,
    },
    reducers:{
        adminProductRequest:(state,action)=>{
            state.isLoading = true;
            state.erorr = null;
        },
        adminProductRequestSuccess:(state,action)=>{
            state.products = action.payload;
            state.isLoading = false;
            state.erorr = null;
        },
        adminProductRequestFail:(state,action)=>{
            state.isLoading = false;
            state.erorr = action.payload;
            state.products = [];
        }
    }
})

export const { adminProductRequest,adminProductRequestSuccess,adminProductRequestFail } = adminProductsSlice.actions;

export default adminProductsSlice.reducer;