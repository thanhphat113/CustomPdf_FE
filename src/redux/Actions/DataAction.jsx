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
