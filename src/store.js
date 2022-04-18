import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./reducers/counterSlice";
import themeToggleReducer from "./reducers/themeToggleSlice"
import userReducer from "./reducers/userSlice"
import spinnerReducer from "./reducers/spinnerSlice";
import galleryReducer from "./reducers/gallerySlice";
import errorReducer from "./reducers/errorSlice";
import blockMessageReducer from "./reducers/blockMessageSlice";

const store = configureStore({
    reducer: {
        'counter': counterReducer,
        'themeToggle': themeToggleReducer,
        'user': userReducer,
        'spinner': spinnerReducer,
        'gallery': galleryReducer,
        'error': errorReducer,
        'blockMessage' : blockMessageReducer,
    }
})

export default store