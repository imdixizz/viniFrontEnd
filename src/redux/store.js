import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import dialogSlice from "./slice/dialogSlice";
import userSlice from "./slice/userSlice";
import bannerSlice from "./slice/bannerSlice";
import categorySlice from "./slice/categorySlice";
import attributesSlice from "./slice/attributesSlice";
import productSlice from "./slice/productSlice";

// Enable Redux DevTools Extension

const store = configureStore({
  reducer: {
    auth: authSlice,
    dialogue: dialogSlice,
    user: userSlice,
    banner: bannerSlice,
    category: categorySlice,
    attributes: attributesSlice,
    product: productSlice,
  },
});

export default store;
