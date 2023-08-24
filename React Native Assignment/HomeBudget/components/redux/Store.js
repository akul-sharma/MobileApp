import { configureStore } from "@reduxjs/toolkit";
import persistedReducer from "./RootReducer";

const store=configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
});

export default store;