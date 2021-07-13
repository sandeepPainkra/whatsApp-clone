import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
   name: "room",
   initialState: {
      roomName: null,
      roomId: null,
   },
   reducers: {
      setRoomDetails: (state, action) => {
         state.roomName = action.payload.roomName;
         state.roomId = action.payload.roomId;
      },
   },
});

export const { setRoomDetails } = roomSlice.actions;

export const selectRoomName = (state) => state.room.roomName;
export const selectRoomId = (state) => state.room.roomId;

export default roomSlice.reducer;
