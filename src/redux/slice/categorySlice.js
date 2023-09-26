import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance } from "../../api/axiosApi";

const initialState = {
  category: [],
  isLoading: false,
  isSkeleton: false,
};
export const categoryGet = createAsyncThunk("category/show", async () => {
  return apiInstance.get("category/show");
});
export const categoryAdd = createAsyncThunk("category/create", async (payload) => {
  return apiInstance.post("category/create", payload);
});
export const categoryUpdate = createAsyncThunk("category/update", async (payload) => {
  return apiInstance.patch(`category/update?categoryId=${payload.categoryId}`, payload.formData);
});
export const categoryDelete = createAsyncThunk("category/delete", async (id) => {
  return apiInstance.delete(`category/delete?categoryId=${id}`);
});

const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    // categoryGet
    builder.addCase(categoryGet.pending, (state, action) => {
      state.isSkeleton = true;
    });
    builder.addCase(categoryGet.fulfilled, (state, action) => {
      state.category = action.payload.category;
      state.isSkeleton = false;

    });
    builder.addCase(categoryGet.rejected, (state, action) => {
      state.isSkeleton = false;
    });

    // categoryCreate
    builder.addCase(categoryAdd.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(categoryAdd.fulfilled, (state, action) => {
      state.category.unshift(action.payload.category);
      state.isLoading = false;
    });
    builder.addCase(categoryAdd.rejected, (state, action) => {
      state.isLoading = false;
    });

    // categoryUpdate
    builder.addCase(categoryUpdate.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(categoryUpdate.fulfilled, (state, action) => {
      const categoryIdx = state.category.findIndex((category) => category._id === action.payload.category._id);
      if (categoryIdx !== -1) {
        state.category[categoryIdx] = { ...state.category[categoryIdx], ...action.payload.category };
      }
      state.isLoading = false;
    });
    builder.addCase(categoryUpdate.rejected, (state, action) => {
      state.isLoading = false;
    });

    // categoryDelete
    builder.addCase(categoryDelete.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(categoryDelete.fulfilled, (state, action) => {
      state.category = state.category.filter((category) => category._id !== action.meta.arg);
      state.isLoading = false;
    });
    builder.addCase(categoryDelete.rejected, (state, action) => {
      state.isLoading = false;
    });

  },
});
export default categorySlice.reducer;

