import { createSlice } from "@reduxjs/toolkit";
import { getAllElementsOfPdf, saveAllElements, savePdfSize } from "../Actions/DataAction";

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
        setAnnouncement: (state, action) => {
            const { message } = action.payload;
            state.message = message;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllElementsOfPdf.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getAllElementsOfPdf.fulfilled, (state, action) => {
                const { message } = action.payload;
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = message;
            })
            .addCase(getAllElementsOfPdf.rejected, (state, action) => {
                const { message } = action.payload;
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = message;
            })
            .addCase(saveAllElements.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(saveAllElements.fulfilled, (state, action) => {
                const { message } = action.payload;
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = message;
            })
            .addCase(saveAllElements.rejected, (state, action) => {
                const { message } = action.payload;
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = message;
            })
            .addCase(savePdfSize.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(savePdfSize.fulfilled, (state, action) => {
                const { message } = action.payload;
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = message;
            })
            .addCase(savePdfSize.rejected, (state, action) => {
                const { message } = action.payload;
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = message;
            });
    },
});

export const { acceptAnnouncement, setAnnouncement } =
    AnnouncementSlice.actions;
export default AnnouncementSlice.reducer;
