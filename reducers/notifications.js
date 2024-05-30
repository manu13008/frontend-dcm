import { createSlice } from '@reduxjs/toolkit';

const initialState = {
notifs : null
};

export const notificationsSlice = createSlice({
 name: 'notifications',

  initialState,
 reducers: {
   getNotifs: (state, action) => {
     state.notifs = action.payload

   },

 },
});

export const { getNotifs} = notificationsSlice.actions;
export default notificationsSlice.reducer;