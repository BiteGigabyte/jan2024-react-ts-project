import {configureStore} from "@reduxjs/toolkit";
import {movieReducer} from "./slices/movieSlice";

let store = configureStore({
    reducer: {
        movies: movieReducer
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