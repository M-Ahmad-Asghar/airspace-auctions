// Example rootReducer, expand as you add slices
import { combineReducers } from "@reduxjs/toolkit";
import { api } from "./api";
// import your other slices here

const rootReducer = combineReducers({
  // yourSlice: yourSlice.reducer,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;