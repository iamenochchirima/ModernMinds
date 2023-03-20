import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  isExploreOpen: false,
  search: false
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
    setSearchOpen(state) {
        state.search = true;
      },
    setSearchClose(state) {
        state.search = false;
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
    setExploreClose,
    setSearchOpen,
    setSearchClose
  } = appSlice.actions;
  export default appSlice.reducer;
