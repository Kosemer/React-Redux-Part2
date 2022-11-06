import { createSlice } from "@reduxjs/toolkit";

const uiSlicec = createSlice({
  name: "ui",
  initialState: { cartIsVisible: true, notification: null },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export default uiSlicec;

export const uiSliceActions = uiSlicec.actions;
