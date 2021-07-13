import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
   name: "user",
   initialState: {
      user:[],
   },
   reducers: {
      LogIn: (state, action) => {
         state.user = action.payload;
      },
      LogOut: (state) => {
         state.user = null;
      },
   },
});

export const { LogIn, LogOut } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
