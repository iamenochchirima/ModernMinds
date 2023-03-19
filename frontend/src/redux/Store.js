import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import {authApiSlice} from './api/authApiSlice';
import {generalApiSlice} from './api/generalApiSlice';

import { authSlice } from "./slices/authSlice";
import { appSlice } from "./slices/appSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      [authApiSlice.reducerPath]: authApiSlice.reducer,
      [generalApiSlice.reducerPath]: generalApiSlice.reducer,
      [authSlice.name]: authSlice.reducer,
      [appSlice.name]: appSlice.reducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authApiSlice.middleware,
        generalApiSlice.middleware
      ),
  });

export const wrapper = createWrapper(makeStore);
