import axios, { AxiosError } from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  foods: [],
  loading: false,
  error: null,
};

export const getAllFoods = createAsyncThunk("foods/getAllFoods", async () => {
  try {
    const response = await axios.get("http://localhost:5555/foods");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;
      const warningMessage = responseData.message;
      throw new Error(warningMessage);
    } else {
      console.error(error);
      throw error;
    }
  }
});

const foodsSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllFoods.fulfilled, (state, action) => {
      state.foods = action.payload;
      state.loading = false;
      state.error = null;
    });
  },
});

const foodsReducer = foodsSlice.reducer;
export default foodsReducer;
