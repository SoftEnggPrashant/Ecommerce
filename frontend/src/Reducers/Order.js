import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
    name:'orders',
    initialState:{
        orders:[],
        isLoading:false,
        error:null
    },
    reducers:{
        orderRequest:(state,action)=>{
            state.isLoading = true;
            state.error = null;
        },
        orderRequestSuccess:(state,action)=>{
            state.isLoading = false;
            state.error = null;
            state.orders = action.payload;
        },
        orderRequestFail:(state,action)=>{
            state.error = action.payload;
            state.isLoading = false;
            state.orders = [];
        }
    }
})

export const { orderRequest,orderRequestSuccess,orderRequestFail } = orderSlice.actions;
export default orderSlice.reducer;