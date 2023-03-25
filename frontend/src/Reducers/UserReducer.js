import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  loading: false,
  error: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: { 
        fetchUsersStart:(state,action) =>{
            state.loading = true;
            state.error = "";
        },
        fetchUsersSuccess:(state,action) =>{
            console.log("user action",action);
            state.loading = false;
            state.user = action.payload;
            state.error = "";
        },
        fetchUsersFail:(state,action) =>{
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { fetchUsersStart, fetchUsersSuccess, fetchUsersFail } = userSlice.actions;

export default userSlice.reducer;