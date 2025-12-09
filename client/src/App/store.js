import { configureStore } from "@reduxjs/toolkit"
import apiSlice from "./apiSlice"
import authSlice from "../features/auth/authSlice"
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth:authSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: false
})
export default store