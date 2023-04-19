import { createSlice } from "@reduxjs/toolkit";

export const deleteProductSlice = createSlice({
    name:'deleteProduct',
    initialState:{
        message:'',
        isDeleted: false,
        error:null
    },
    reducers:{
        deleteProductRequest:(state,action)=>{
            state.isDeleted = false;
            state.error = null;
        },
        deleteProductResponse:(state,action)=>{
            state.message = action.payload;
            state.isDeleted = true;
            state.error = null;
        },
        deleteProductRequestFail:(state,action)=>{
            state.message = action.payload;
            state.isLoading = false;
            state.error = action.payload
        },
        clearImmediateRequest:(state,action)=>{
            state.isDeleted = false;
            state.error = null;
        }
    }
})

export const{ deleteProductRequest,deleteProductResponse,deleteProductRequestFail,clearImmediateRequest } = deleteProductSlice.actions;

export default deleteProductSlice.reducer;