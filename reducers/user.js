import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 username: null,
 token: null
};

export const userSlice = createSlice({
 name: 'user',

  initialState,
 reducers: {
   login: (state, action) => {
     state.username = action.payload.username,
     state.token = action.payload.token
   },
 },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;