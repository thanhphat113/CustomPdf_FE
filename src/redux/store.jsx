import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./Slices/DataSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});