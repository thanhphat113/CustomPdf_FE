import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";
import _ from "lodash";
import { setAnnouncement } from "../Slices/AnnoucementSlice";

export const getAllElementsOfPdf = createAsyncThunk(
    "pdf/fetchElementsOfPdf", // Tên action
    async (id, thunkAPI) => {
        try {
            const response = await axiosInstance.get(`/api/ThuocTinh/${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Lỗi gọi API", error);
        }
    }
);

export const saveAllElements = createAsyncThunk(
    "pdf/saveElements", // Tên action
    async (items, thunkAPI) => {
        try {
            console.log(items)
            const state = thunkAPI.getState();
            const currentElements = state.data.currentElementsValue;
            const currentTables = state.data.currentTablesValue;

            const isEqual = _.isEqual(items.elements, currentElements);
            if (isEqual)
                thunkAPI.dispatch(
                    setAnnouncement({
                        message: "Bạn chưa thay đổi dữ liệu !!!",
                    })
                );
            else {
                const response = await axiosInstance.put(
                    "/api/ThuocTinh/Save",
                    items
                );
                return response.data;
            }
        } catch (error) {
            return thunkAPI.rejectWithValue("Lỗi gọi API", error);
        }
    }
);


export const savePdfSize = createAsyncThunk(
    "pdf/savePdfSize", // Tên action
    async (pdf, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const currentPdf = state.data.currentPdfValue;

            const isEqual = _.isEqual(pdf, currentPdf);
            if (isEqual)
                thunkAPI.dispatch(
                    setAnnouncement({
                        message: "Bạn chưa thay đổi dữ liệu !!!",
                    })
                );
            else {
                const response = await axiosInstance.put(
                    "/api/Pdf/Save",
                    pdf
                );
                return response.data;
            }
        } catch (error) {
            return thunkAPI.rejectWithValue("Lỗi gọi API", error);
        }
    }
);
