import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./Slices/DataSlice";
import AnnouncementReducer from "./Slices/AnnoucementSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    announcement: AnnouncementReducer
  },
});