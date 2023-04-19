import { createSlice } from "@reduxjs/toolkit";

export const updateSlice = createSlice({
  name: "updateProduct",
  initialState: {
    isUpdate: false,
    message: "",
    error: null,
  },
  reducers: {
    productUpdateRequest: (state, action) => {
      state.isUpdate = false;
      state.message = "";
      state.error = null;
    },
    productUpdateRequestSuccess: (state, action) => {
      state.isUpdate = true;
      state.message = action.payload;
      state.error = null;
    },
    productUpdateRequestFail: (state, action) => {
      state.isUpdate = false;
      state.error = action.payload;
      state.message = "";
    },
  },
});

export const {
  productUpdateRequest,
  productUpdateRequestSuccess,
  productUpdateRequestFail,
} = updateSlice.actions;

export default updateSlice.reducer;
