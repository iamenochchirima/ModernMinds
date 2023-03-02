import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import {apiSlice} from './api/apiSlice';

import { authSlice } from "./slices/authSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      [authSlice.name]: authSlice.reducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  });

export const wrapper = createWrapper(makeStore);
