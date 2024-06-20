import {configureStore} from "@reduxjs/toolkit";
import {movieReducer} from "./slices/movieSlice";
import {accountReducer} from "./slices/accountSlice";

let store = configureStore({
    reducer: {
        movies: movieReducer,
        account: accountReducer
    }
});

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch


export {
    store
}

export type {
    RootState,
    AppDispatch
}