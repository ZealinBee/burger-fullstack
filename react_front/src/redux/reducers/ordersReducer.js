import axios, { AxiosError } from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  loading: false,
  error: null,
  currentOrder: null,
  orderDetails: [],
};

export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        "http://localhost:5555/displayOrder",
        config
      );
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
);

export const getOneOrder = createAsyncThunk(
  "orders/getOneOrder",
  async ({ orderId, token }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `http://localhost:5555/orders/${orderId}`,
        config
      );
      console.log(response);
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
);

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async ({ order, token }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        "http://localhost:5555/placeOrder",
        order,
        config
      );
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
);

export const modifyOrder = createAsyncThunk(
  "orders/modifyOrder",
  async ({ order_id, token }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const order = {
        status: "finished",
      };

      const response = await axios.put(
        `http://localhost:5555/editStatus/${order_id}`,
        order,
        config
      );
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
);

export const getMyOrders = createAsyncThunk(
  "orders/getMyOrders",
  async (token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        "http://localhost:5555/displayYourOrder",
        config
      );
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
);

const ordersSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getOneOrder.fulfilled, (state, action) => {
      state.orderDetails = action.payload;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.orders.push(action.payload);
    });
    builder.addCase(modifyOrder.fulfilled, (state, action) => {
      state.orders = state.orders.map((order) => {
        if (order.order_id === action.payload) {
          order.status = "finished";
        }
        return order;
      });
    });
    builder.addCase(getMyOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  },
});

const ordersReducer = ordersSlice.reducer;
export const { setCurrentOrder } = ordersSlice.actions;
export default ordersReducer;
