import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  isExploreOpen: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setExploreOpen(state) {
        state.isExploreOpen = true;
      },
    setExploreClose(state) {
        state.isExploreOpen = false;
      },

    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.auth,
        };
      },
    },
  },
});

export const {
    setExploreOpen,
    setExploreClose
  } = appSlice.actions;
  export default appSlice.reducer;
