import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import cartReducer from "./cartSlice";

export default configureStore({
   reducer: {
      cart: cartReducer,
      search: searchReducer
   },
});

