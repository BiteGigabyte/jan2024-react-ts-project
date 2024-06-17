import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IPagination} from "../../interfaces/paginationInterface";
import {IMovie} from "../../interfaces/movie.interface";
import {movieService} from "../../services/movieService";

interface IState {
    movies: IMovie[]
}

let initialState:IState = {
    movies: []
};

const getMovies= createAsyncThunk<IPagination<IMovie>, void>  (
    'carSlice/getAll',
    async (_, {rejectWithValue}) => {
                try {
                    let {data} = await movieService.getMovies();
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
                state.movies = action.payload.results;
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