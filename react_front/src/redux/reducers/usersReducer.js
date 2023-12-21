import axios, { AxiosError } from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loading: false,
  error: null,
  currentToken: null,
  isLoggedIn: false,
  currentUser: null,
};

export const signUpUser = createAsyncThunk("users/signUpUser", async (user) => {
  try {
    const response = await axios.post("http://localhost:5555/users", user, {
      headers: { "Content-Type": "application/json" },
    });
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

export const loginUser = createAsyncThunk("users/loginUser", async (user) => {
  try {
    const response = await axios.post("http://localhost:5555/login", user, {
      headers: { "Content-Type": "application/json" },
    });
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

export const getSelf = createAsyncThunk("users/getSelf", async (token) => {
  try {
    const response = await axios.get("http://localhost:5555/getSelf", token, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
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

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (token) => {
    try {
      const response = await axios.get("http://localhost:5555/users", token, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
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
  }
)

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.users.push(action.payload);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.currentToken = action.payload.token;
    });
    builder.addCase(getSelf.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      console.log(action.payload)
    });
  },
});

const usersReducer = usersSlice.reducer;
export default usersReducer;
