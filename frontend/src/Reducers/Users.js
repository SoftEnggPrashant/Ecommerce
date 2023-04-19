import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
    name:"users",
    initialState:{
        users:[],
        isLoading:false,
        error:null,
    },
    reducers:{
        getAllUserRequest:(state,action)=>{
            state.isLoading = true;
            state.error = null;
        },
        getAllUserRequestSuccess:(state,action)=>{
            state.isLoading = false;
            state.users = action.payload;
            state.error = null;
        },
        getAllUserRequestFail:(state,action)=>{
            state.error = action.payload;
            state.users = [];
            state.isLoading = false;
        }
    }
})

export const { getAllUserRequest,getAllUserRequestSuccess,getAllUserRequestFail } = usersSlice.actions;
export default usersSlice.reducer;