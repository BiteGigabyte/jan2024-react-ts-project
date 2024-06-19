import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IPagination} from "../../interfaces/paginationInterface";
import {IMovie} from "../../interfaces/movies.interface";
import {movieService} from "../../services/movieService";

interface IState {
    movies: IMovie[];
    error: string | null;
}

let initialState:IState = {
    movies: [],
    error: null
};

const getMovies= createAsyncThunk<IPagination<IMovie>, void>  (
    'carSlice/getAll',
    async (_, {rejectWithValue}) => {
                try {
                    let {data} = await movieService.getMovies();
                    console.log(data);
                    return data;
                } catch (e) {
                    return rejectWithValue(e);
                }
            }
)



let movieSlice = createSlice({
    name: 'carSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getMovies.fulfilled, (state, action) => {
                if (action.payload && action.payload.results) {
                    state.movies = action.payload.results;
                }
                // else {
                //     state.movies = [];
                // }
            })
            .addCase(getMovies.rejected, (state, action) => {
                // state.error = 'erroro';
            })
});

const {reducer: movieReducer, actions} = movieSlice;

const movieActions = {
    ...actions,
    getMovies
}

export {
    movieActions,
    movieReducer
}