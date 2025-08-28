import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, ready: false },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      state.ready = true;
    },
    removeUser: (state) => {
      state.user = null;
      state.ready = true;
    },
  },
});

export default userSlice.reducer;
export const { addUser, removeUser } = userSlice.actions;
