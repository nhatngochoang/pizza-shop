import { createSlice } from "@reduxjs/toolkit";
import searchReducer from '../pages/reducers/search.js'
const search = createSlice({
   name: "search",
   initialState: {
      searchFilter: null,
      quantity: 0
   },
   reducers: {
      setSearch: (state, action) => {
         state.searchFilter = action.payload.searchString;
      },
      increaseSearch: (state, action) => {
         state.quantity = +action.payload.quantity + 1
      },
   },

});

export const { setSearch, increaseSearch } = search.actions;
export default search.reducer;