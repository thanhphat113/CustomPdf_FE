import { createSlice } from "@reduxjs/toolkit";
import { getAllPdfs, saveAllPdfs } from "../Actions/DataAction";

const AnnouncementSlice = createSlice({
    name: "announcement",
    initialState: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: "",
    },
    reducers: {
        acceptAnnouncement: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPdfs.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getAllPdfs.fulfilled, (state, action) => {
                const { message } = action.payload;
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = message;
            })
            .addCase(getAllPdfs.rejected, (state, action) => {
                const { message } = action.payload;
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = message;
            })
        .addCase(saveAllPdfs.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(saveAllPdfs.fulfilled, (state, action) => {
                const { message } = action.payload;
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = message;
            })
            .addCase(saveAllPdfs.rejected, (state, action) => {
                const { message } = action.payload;
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = message;
            });
    },
});

export const {
    acceptAnnouncement
} = AnnouncementSlice.actions;
export default AnnouncementSlice.reducer;
