import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getUsers, registerUser } from "../../services/api";


// ===============================
// LOGIN USER
// ===============================
export const loginUser = createAsyncThunk(
  "auth/loginUser",

  async ({ email, password }, thunkAPI) => {
    try {
      const response = await getUsers();

      const user = response.data.find(
        (item) =>
          item.email === email &&
          item.password === password
      );

      if (!user) {
        return thunkAPI.rejectWithValue(
          "Invalid email or password"
        );
      }

      return user;

    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Server connection failed"
      );
    }
  }
);


// ===============================
// REGISTER NEW USER
// ===============================
export const registerNewUser = createAsyncThunk(
  "auth/registerNewUser",

  async (user, thunkAPI) => {
    try {
      const response = await getUsers();

      const exists = response.data.some(
        (item) =>
          item.email === user.email
      );

      if (exists) {
        return thunkAPI.rejectWithValue(
          "Email already registered"
        );
      }

      const result = await registerUser(user);

      return result.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Registration failed"
      );
    }
  }
);


// ===============================
// SAVED USER FROM LOCAL STORAGE
// ===============================
const savedUser = JSON.parse(
  localStorage.getItem("modaworldUser")
);


// ===============================
// AUTH SLICE
// ===============================
const authSlice = createSlice({

  name: "auth",

  initialState: {

    user: savedUser || null,

    isLoggedIn: !!savedUser,

    loading: false,

    error: null
  },


  // ===============================
  // REDUCERS
  // ===============================
  reducers: {

    logoutUser: (state) => {

      state.user = null;

      state.isLoggedIn = false;

      state.error = null;

      localStorage.removeItem(
        "modaworldUser"
      );
    },


    clearAuthError: (state) => {

      state.error = null;
    }
  },


  // ===============================
  // EXTRA REDUCERS
  // ===============================
  extraReducers: (builder) => {

    builder

      // ===============================
      // LOGIN PENDING
      // ===============================
      .addCase(
        loginUser.pending,
        (state) => {

          state.loading = true;

          state.error = null;
        }
      )


      // ===============================
      // LOGIN SUCCESS
      // ===============================
      .addCase(
        loginUser.fulfilled,
        (state, action) => {

          state.loading = false;

          state.user = action.payload;

          state.isLoggedIn = true;

          state.error = null;

          localStorage.setItem(
            "modaworldUser",
            JSON.stringify(action.payload)
          );
        }
      )


      // ===============================
      // LOGIN FAILED
      // ===============================
      .addCase(
        loginUser.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload;
        }
      )


      // ===============================
      // REGISTER PENDING
      // ===============================
      .addCase(
        registerNewUser.pending,
        (state) => {

          state.loading = true;

          state.error = null;
        }
      )


      // ===============================
      // REGISTER SUCCESS
      // ===============================
      .addCase(
        registerNewUser.fulfilled,
        (state) => {

          state.loading = false;

          state.error = null;
        }
      )


      // ===============================
      // REGISTER FAILED
      // ===============================
      .addCase(
        registerNewUser.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload;
        }
      );
  }
});


// ===============================
// EXPORT ACTIONS
// ===============================
export const {
  logoutUser,
  clearAuthError
} = authSlice.actions;


// ===============================
// EXPORT REDUCER
// ===============================
export default authSlice.reducer;

