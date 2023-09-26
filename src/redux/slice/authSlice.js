import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance } from "../../api/axiosApi";
import jwt_decode from "jwt-decode";
import { SetDevKey, setToken } from "../../component/util/setAuth";
import { key } from "../../component/util/config";


const initialState = {
  admin: {},
  isAuth: false,
  isLoading: false
};
export const login = createAsyncThunk("admin/login", async (payload) => {
  return apiInstance.post("admin/login", payload);
});


const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setOldAdmin(state, action) {
      let token_ = JSON.parse(action.payload);
      state.admin = token_;
      state.isAuth = true;
      SetDevKey(key);
    },
    logout(state, action) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("key");
      sessionStorage.removeItem("isAuth");
      state.admin = {};
      state.isAuth = false;

    }
  },
  extraReducers: (builder) => {
    // Admin Login
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      let token_ = jwt_decode(action.payload.token);
      state.admin = token_;
      state.isAuth = true;
      state.isLoading = false;

      SetDevKey(key);
      sessionStorage.setItem("token", token_ ? JSON.stringify(token_) : undefined);
      sessionStorage.setItem("key", key ? key : undefined);
      sessionStorage.setItem("isAuth", true);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
    });
  
  },
});
export default authSlice.reducer;
export const { setOldAdmin,logout } = authSlice.actions

