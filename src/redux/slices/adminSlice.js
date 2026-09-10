import React from 'react'
import { createSlice } from '@reduxjs/toolkit'
const savedAdmin = localStorage.getItem("modaworldAdmin");

const initialState = {
  isAdminLoggedIn: savedAdmin === "true",
  adminName: "ModaWorld Admin",
};

const adminSlice = createSlice({
  name: "admin",

  initialState,

  reducers: {
    adminLogin: (state) => {
      state.isAdminLoggedIn = true;
      state.adminName = "ModaWorld Admin";

      localStorage.setItem("modaworldAdmin", "true");
    },

    adminLogout: (state) => {
      state.isAdminLoggedIn = false;
      state.adminName = "";

      localStorage.removeItem("modaworldAdmin");
    },
  },
});

export const {
  adminLogin,
  adminLogout,
} = adminSlice.actions;





export default adminSlice.reducer
