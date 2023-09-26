import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance } from "../../api/axiosApi";

const initialState = {
  banner: [],
  isLoading: false,
  isSkeleton: false,
};
export const bannerGet = createAsyncThunk("banner/show", async () => {
  return apiInstance.get("banner/show");
});
export const bannerAdd = createAsyncThunk("banner/create", async (payload) => {
  return apiInstance.post("banner/create", payload);
});
export const bannerUpdate = createAsyncThunk("banner/update", async (payload) => {
  return apiInstance.patch(`banner/update?bannerId=${payload.bannerId}`, payload.formData);
});
export const bannerDelete = createAsyncThunk("banner/delete", async (id) => {
  return apiInstance.delete(`banner/delete?bannerId=${id}`);
});

const banenrSlice = createSlice({
  name: "banenrSlice",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    // bannerGet
    builder.addCase(bannerGet.pending, (state, action) => {
      state.isSkeleton = true;
    });
    builder.addCase(bannerGet.fulfilled, (state, action) => {
      state.banner = action.payload.banner;
      state.isSkeleton = false;

    });
    builder.addCase(bannerGet.rejected, (state, action) => {
      state.isSkeleton = false;
    });

    // bannerCreate
    builder.addCase(bannerAdd.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(bannerAdd.fulfilled, (state, action) => {
      state.banner.unshift(action.payload.banner);
      state.isLoading = false;
    });
    builder.addCase(bannerAdd.rejected, (state, action) => {
      state.isLoading = false;
    });

    // bannerUpdate
    builder.addCase(bannerUpdate.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(bannerUpdate.fulfilled, (state, action) => {
      const bannerIdx = state.banner.findIndex((banner) => banner._id === action.payload.banner._id);
      if (bannerIdx !== -1) {
        state.banner[bannerIdx] = { ...state.banner[bannerIdx], ...action.payload.banner };
      }
      state.isLoading = false;
    });
    builder.addCase(bannerUpdate.rejected, (state, action) => {
      state.isLoading = false;
    });

    // bannerDelete
    builder.addCase(bannerDelete.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(bannerDelete.fulfilled, (state, action) => {
      state.banner = state.banner.filter((banner) => banner._id !== action.meta.arg);
      state.isLoading = false;
    });
    builder.addCase(bannerDelete.rejected, (state, action) => {
      state.isLoading = false;
    });

  },
});
export default banenrSlice.reducer;

