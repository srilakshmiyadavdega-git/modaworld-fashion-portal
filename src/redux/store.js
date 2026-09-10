import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice"
import wishlistReducer from "./slices/wishlistSlice"
import authReducer from "./slices/authSlice"
import orderReducer from "./slices/orderSlice"
import adminreducer from "./slices/adminSlice"
import productReducer from "./slices/productSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
    order: orderReducer,
    admin: adminreducer,
    products: productReducer,
    
  }
});