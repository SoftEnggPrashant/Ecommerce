import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./Reducers/ProductReducer";
import userSlice from "./Reducers/UserReducer";
import productDetailSlice from "./Reducers/ProductDetails";
import deleteProductSlice from "./Reducers/ProductDelete";
import adminProductsSlice from "./Reducers/AdminProducts";
import updateSlice from "./Reducers/ProductUpdate";
import orderSlice  from "./Reducers/Order";
import usersSlice  from "./Reducers/Users";
import cartSlice   from "./Reducers/CartsProduct";

export const store = configureStore({
  reducer: {
    products: productSlice,
    user: userSlice,
    productDetail: productDetailSlice,
    deleteProduct: deleteProductSlice,
    adminProduct: adminProductsSlice,
    updateProduct: updateSlice,
    orders:orderSlice,
    users:usersSlice,
    Cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
