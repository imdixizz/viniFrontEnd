import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance } from "../../api/axiosApi";

const initialState = {
  product: [],
  productCount: 0,
  productDetails: [],
  isLoading: false,
  isSkeleton: false,
};
export const productGet = createAsyncThunk("product/show", async (payload) => {
  return apiInstance.get(`product/show?page=${payload.page}&limit=${payload.limit}&search=${payload.search}&sortField=${payload.sortField}&sortOrder=${payload.sortOrder}`);
});

export const productShowGet = createAsyncThunk("product/showColorProduct", async (payload) => {
  return apiInstance.get(`product/showColorProduct?productCode=${payload}`);
});

export const productAdd = createAsyncThunk("product/create", async (payload) => {
  return apiInstance.post("product/create", payload);
});

export const editProductDetail = createAsyncThunk("product/updateDetails", async (payload) => {
  return apiInstance.patch(`product/updateDetails`, payload);
});
export const editProductColor = createAsyncThunk("product/updateColor", async (payload) => {
  return apiInstance.patch(`product/updateColor?productId=${payload.productId}`, payload.formData);
});

export const deleteProduct = createAsyncThunk("product/deleteDetails", async (id) => {
  return apiInstance.delete(`product/deleteDetails?productCode=${id}`);
});
export const deleteProductColor = createAsyncThunk("product/deleteColor", async (id) => {
  return apiInstance.delete(`product/deleteColor?productId=${id}`);
});

export const updateProduct = createAsyncThunk("product/updateProduct", async (payload) => {
  return apiInstance.put(`product/updateProduct?productId=${payload.productId}&type=${payload.type}&stock=${payload?.stock}`);
});

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    // productGet
    builder.addCase(productGet.pending, (state, action) => {
      state.isSkeleton = action.meta.arg.command;
    });
    builder.addCase(productGet.fulfilled, (state, action) => {
      state.product = action.payload.product;
      state.productCount = action.payload.productTotal;
      state.isSkeleton = false;

    });
    builder.addCase(productGet.rejected, (state, action) => {
      state.isSkeleton = false;
    });

    // productGet
    builder.addCase(productShowGet.pending, (state, action) => {
      state.isSkeleton = true;
    });
    builder.addCase(productShowGet.fulfilled, (state, action) => {
      state.productDetails = action.payload.product;
      state.isSkeleton = false;

    });
    builder.addCase(productShowGet.rejected, (state, action) => {
      state.isSkeleton = false;
    });

    // ==========================
    // productCreate
    builder.addCase(productAdd.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(productAdd.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(productAdd.rejected, (state, action) => {
      state.isLoading = false;
    });

    // ==========================
    // editProductDetail
    builder.addCase(editProductDetail.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(editProductDetail.fulfilled, (state, action) => {
      if (action.payload.status) {
        const productIdx = state.product.findIndex((product) => product._id === action.payload.product.productCode);
        if (productIdx !== -1) {
          state.product[productIdx] = { ...state.product[productIdx], ...action.payload.product };
        }
      }
      state.isLoading = false;
    });
    builder.addCase(editProductDetail.rejected, (state, action) => {
      state.isLoading = false;
    });


    // editProductColor
    builder.addCase(editProductColor.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(editProductColor.fulfilled, (state, action) => {
      if (action.payload.status) {
        const productIdx = state.productDetails.findIndex((product) => product._id === action.payload.product._id);
        if (productIdx !== -1) {
          state.productDetails[productIdx] = { ...state.productDetails[productIdx], ...action.payload.product };
        }
      }
      state.isLoading = false;
    });
    builder.addCase(editProductColor.rejected, (state, action) => {
      state.isLoading = false;
    });

    // deleteProduct
    builder.addCase(deleteProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.product = state.product.filter((product) => product._id !== action.meta.arg);
      state.isLoading = false;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.isLoading = false;
    });

    // deleteProductColorColor
    builder.addCase(deleteProductColor.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProductColor.fulfilled, (state, action) => {
      state.productDetails = state.productDetails.filter((product) => product._id !== action.meta.arg);
      state.isLoading = false;
    });
    builder.addCase(deleteProductColor.rejected, (state, action) => {
      state.isLoading = false;
    });






    // updateValue
    builder.addCase(updateProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const productIdx = state.productDetails.findIndex((product) => product._id === action.payload.product._id);
      if (productIdx !== -1) {
        state.productDetails[productIdx] = { ...state.productDetails[productIdx], ...action.payload.product };
      }
      state.isLoading = false;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.isLoading = false;
    });

  },
});
export default productSlice.reducer;

