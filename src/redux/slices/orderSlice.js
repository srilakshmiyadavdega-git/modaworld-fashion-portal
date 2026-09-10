import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { createOrder, getOrders } from "../../services/api";

export const placeOrder =
  createAsyncThunk(
    "order/placeOrder",

    async (order, thunkAPI) => {

      try {

        const response =
          await createOrder(order);

        return response.data;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          "Unable to place order"
        );
      }
    }
  );

export const fetchOrders =
  createAsyncThunk(
    "order/fetchOrders",

    async (_, thunkAPI) => {

      try {

        const response =
          await getOrders();

        return response.data;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          "Unable to fetch orders"
        );
      }
    }
  );

const savedOrder =
  JSON.parse(
    localStorage.getItem("modaworldLatestOrder")
  );

const orderSlice = createSlice({

  name: "order",

  initialState: {

    orders: [],

    latestOrder:
      savedOrder || null,

    loading: false,

    error: null
  },

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(
        placeOrder.pending,
        (state) => {

          state.loading = true;
          state.error = null;

        }
      )

      .addCase(
        placeOrder.fulfilled,
        (state, action) => {

          state.loading = false;

          state.latestOrder =
            action.payload;

          state.orders.push(
            action.payload
          );

          localStorage.setItem(
            "modaworldLatestOrder",
            JSON.stringify(
              action.payload
            )
          );

        }
      )

      .addCase(
        placeOrder.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload;

        }
      )

      .addCase(
        fetchOrders.fulfilled,
        (state, action) => {

          state.orders =
            action.payload;

        }
      );
  }
});

export default orderSlice.reducer;