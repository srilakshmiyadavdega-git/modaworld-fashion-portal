import { createSlice } from "@reduxjs/toolkit";


const savedCart =
  JSON.parse(localStorage.getItem("modaworldCart")) || [];

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: savedCart
  },

  reducers: {

    addToCart: (state, action) => {

      const product = action.payload;

      const existing = state.items.find(
        (item) =>
          item.id === product.id &&
          item.size === product.size
      );

      if (existing) {

        existing.quantity += 1;

      } else {

        state.items.push({
          ...product,
          quantity: 1,
          size: product.size || "M"
        });

      }

      localStorage.setItem(
        "modaworldCart",
        JSON.stringify(state.items)
      );
    },

    removeFromCart: (state, action) => {

      state.items = state.items.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.size === action.payload.size
          )
      );

      localStorage.setItem(
        "modaworldCart",
        JSON.stringify(state.items)
      );
    },

    increaseQuantity: (state, action) => {

      const item = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size
      );

      if (item) {
        item.quantity += 1;
      }

      localStorage.setItem(
        "modaworldCart",
        JSON.stringify(state.items)
      );
    },

    decreaseQuantity: (state, action) => {

      const item = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size
      );

      if (item) {

        item.quantity -= 1;

        if (item.quantity <= 0) {

          state.items =
            state.items.filter(
              (product) =>
                !(
                  product.id === action.payload.id &&
                  product.size === action.payload.size
                )
            );
        }
      }

      localStorage.setItem(
        "modaworldCart",
        JSON.stringify(state.items)
      );
    },

    clearCart: (state) => {

      state.items = [];

      localStorage.removeItem(
        "modaworldCart"
      );
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;