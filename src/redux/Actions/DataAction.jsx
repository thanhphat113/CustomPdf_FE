import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../AxiosInstance";

export const getAllPdfs = createAsyncThunk(
    "pdf/fetchPdfs", // Tên action
    async (id, thunkAPI) => {
        try {
            const response = await axiosInstance.get(`/api/ThuocTinh/${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Lỗi gọi API", error);
        }
    }
);

export const saveAllPdfs = createAsyncThunk(
    "pdf/savePdfs", // Tên action
    async (elements, thunkAPI) => {
        try {
            const response = await axiosInstance.put(
                "/api/ThuocTinh/Save",
                elements
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Lỗi gọi API", error);
        }
    }
);
