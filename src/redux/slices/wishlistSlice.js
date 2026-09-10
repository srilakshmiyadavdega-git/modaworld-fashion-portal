import { createSlice } from "@reduxjs/toolkit";

const savedWishlist =
  JSON.parse(
    localStorage.getItem("modaworldWishlist")
  ) || [];

const wishlistSlice = createSlice({

  name: "wishlist",

  initialState: {
    items: savedWishlist
  },

  reducers: {

    toggleWishlist: (state, action) => {

      const product = action.payload;

      const exists = state.items.some(
        (item) => item.id === product.id
      );

      if (exists) {

        state.items =
          state.items.filter(
            (item) => item.id !== product.id
          );

      } else {

        state.items.push(product);

      }

      localStorage.setItem(
        "modaworldWishlist",
        JSON.stringify(state.items)
      );
    },

    removeFromWishlist: (state, action) => {

      state.items =
        state.items.filter(
          (item) => item.id !== action.payload
        );

      localStorage.setItem(
        "modaworldWishlist",
        JSON.stringify(state.items)
      );
    },

    clearWishlist: (state) => {

      state.items = [];

      localStorage.removeItem(
        "modaworldWishlist"
      );
    }
  }
});

export const {
  toggleWishlist,
  removeFromWishlist,
  clearWishlist
} = wishlistSlice.actions;

export default wishlistSlice.reducer;