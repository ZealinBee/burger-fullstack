import axios, { AxiosError } from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  loading: false,
  error: null,
};

export const createOrder = createAsyncThunk(
    "cart/createOrder",
    async ({order, token}) => {
        axios.post("http://localhost:5555/orders", order, {
            
        })
    }
);
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find((x) => x.food_id === item.food_id);
      if (!existingItem) {
        const newItem = {
          food_id: item.food_id,
          food_name: item.food_name,
          price: item.price,
          quantity: 1,
        };
        state.cart.push(newItem);
      }
    },
    increaseQuantity: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find((x) => x.food_id === item.food_id);
      if (existingItem) {
        existingItem.quantity++;
      }
    },
    decreaseQuantity: (state, action) => {
      console.log(action.payload)
      const item = action.payload;
      const existingItem = state.cart.find((x) => x.food_id === item.food_id);
      
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
      }
    },
    clearCart: (state, action) => {
      state.cart = [];
    },
  },
});

const cartReducer = cartSlice.reducer;
export const { addToCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartReducer;
