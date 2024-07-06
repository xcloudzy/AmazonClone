import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import rootreducers from "./components/redux/reducers/main";

const store = configureStore({
  reducer: rootreducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
