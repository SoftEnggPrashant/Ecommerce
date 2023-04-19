import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  loading: false,
  isAuthenticate:false,
  error: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: { 
        fetchUsersStart:(state,action) =>{
            state.loading = true;
            state.error = "";
            state.isAuthenticate = false;
        },
        fetchUsersSuccess:(state,action) =>{
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticate = true;
            state.error = "";
        },
        fetchUsersFail:(state,action) =>{
            state.loading = false;
            state.isAuthenticate = false;
            state.error = action.payload;
        },
        userLogout: (state, action) =>{
            state.loading = false;
            state.isAuthenticate = false;
            state.error = '';
        }
    }
});

export const { fetchUsersStart, fetchUsersSuccess, fetchUsersFail,userLogout } = userSlice.actions;

export default userSlice.reducer;