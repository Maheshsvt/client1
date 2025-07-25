import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./toastSlice";
import loaderReducer from "./loaderSlice";

const store = configureStore({
    reducer: {
        toast: toastReducer,
        loader: loaderReducer
    }
});

export default store;