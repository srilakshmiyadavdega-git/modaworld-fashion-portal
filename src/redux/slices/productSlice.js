import React from 'react'
import { createAsyncThunk,createSlice } from '@reduxjs/toolkit'

const API_URL = "http://localhost:5000/products"

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${id}`);

      if (!response.ok) {
        throw new Error("Product not found");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/${product.id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(product),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  products: [],

  selectedProduct: null,

  loading: false,

  error: null,

  success: false,
};


const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {

    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },

    clearProductError: (state) => {
      state.error = null;
    },

    clearProductSuccess: (state) => {
      state.success = false;
    },

  },

  extraReducers: (builder) => {

    builder

      .addCase(
        getProducts.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getProducts.fulfilled,
        (state, action) => {
          state.loading = false;
          state.products = action.payload;
        }
      )

      .addCase(
        getProducts.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder

      .addCase(
        getProductById.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getProductById.fulfilled,
        (state, action) => {
          state.loading = false;
          state.selectedProduct = action.payload;
        }
      )

      .addCase(
        getProductById.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );

    builder

      .addCase(
        addProduct.pending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        }
      )

      .addCase(
        addProduct.fulfilled,
        (state, action) => {
          state.loading = false;

          state.products.push(
            action.payload
          );

          state.success = true;
        }
      )

      .addCase(
        addProduct.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder

      .addCase(
        updateProduct.pending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        }
      )

      .addCase(
        updateProduct.fulfilled,
        (state, action) => {
          state.loading = false;

          const index =
            state.products.findIndex(
              (product) =>
                product.id === action.payload.id
            );

          if (index !== -1) {
            state.products[index] =
              action.payload;
          }

          state.success = true;
        }
      )

      .addCase(
        updateProduct.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder

      .addCase(
        deleteProduct.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        deleteProduct.fulfilled,
        (state, action) => {
          state.loading = false;

          state.products =
            state.products.filter(
              (product) =>
                product.id !== action.payload
            );

          state.success = true;
        }
      )

      .addCase(
        deleteProduct.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );

  },
});

export const {
  clearSelectedProduct,
  clearProductError,
  clearProductSuccess,
} = productSlice.actions;

export default productSlice.reducer;


