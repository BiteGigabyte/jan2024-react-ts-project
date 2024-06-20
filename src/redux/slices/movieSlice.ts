import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IPagination} from "../../interfaces/paginationInterface";
import {IMovie} from "../../interfaces/movies.interface";
import {movieService} from "../../services/movieService";
import {IGenres} from "../../interfaces/genres.interface";

interface IState {
    movies: IMovie[];
    error: string | null;
    total_pages: number | null;
    genres: IGenres | null;
    moviesByGenre: IPagination<IMovie> | null;
    moviesBySearch: IPagination<IMovie> | null;
}

interface GetMoviesByGenreArgs {
    id: number;
    page: number;
}

let initialState:IState = {
    movies: [],
    error: null,
    total_pages: null,
    genres: null,
    moviesByGenre: null,
    moviesBySearch: null
};


const getMovies= createAsyncThunk<IPagination<IMovie>, string>  (
    'movieSlice/getMovies',
    async (page: string, {rejectWithValue}) => {
                try {
                    let {data} = await movieService.getMovies(page);
                    return data;
                } catch (e) {
                    return rejectWithValue(e);
                }
            }
)

const getGenres = createAsyncThunk<IGenres, void>(
    'movieSlice/getGenres',
    async (_, { rejectWithValue }) => {
        try {
            const response = await movieService.getGenres();
            return response.data; // Повертаємо дані жанрів з відповіді
        } catch (error) {
            return rejectWithValue(error); // Обробляємо помилку
        }
    }
);

const getMoviesByGenre = createAsyncThunk<IPagination<IMovie>, GetMoviesByGenreArgs>(
    'movieSlice/getMoviesByGenre',
    async ({ id, page }, { rejectWithValue }) => {
        try {
            const response = await movieService.searchByGenres(id, page);
            console.log(response);
            return response.data; // Повертаємо дані, які очікує createAsyncThunk
        } catch (error) {
            return rejectWithValue(error); // Обробляємо помилку
        }
    }
);

const searchMovies = createAsyncThunk<IPagination<IMovie>, string>(
    'movieSlice/searchMovies',
    async (name :string, { rejectWithValue }) => {
        try {
            const response = await movieService.searchMovies(name);
            console.log(response.data);
            return response.data; // Повертаємо дані, які очікує createAsyncThunk
        } catch (error) {
            return rejectWithValue(error); // Обробляємо помилку
        }
    }
);


let movieSlice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getMovies.fulfilled, (state, action) => {
                if (action.payload && action.payload.results) {
                    state.movies = action.payload.results;
                    state.total_pages = action.payload.total_pages;
                }
                // else {
                //     state.movies = [];
                // }
            })
            .addCase(getMovies.rejected, (state, action) => {
                // state.error = 'erroro';
            })
            .addCase(getGenres.fulfilled, (state, action) => {
                state.genres = action.payload;
            })
            .addCase(getGenres.rejected, (state, action) => {
                // state.error = 'erroro';
            })
            .addCase(getMoviesByGenre.fulfilled, (state, action) => {
                state.moviesByGenre = action.payload;
            })
            .addCase(getMoviesByGenre.rejected, (state, action) => {
                // state.error = 'erroro';
            })
            .addCase(searchMovies.fulfilled, (state,  action) => {
            state.moviesBySearch = action.payload;
            })
            .addCase(searchMovies.rejected, (state,  action) => {
            // state.error = actions.payload;
            })

});

const {reducer: movieReducer, actions} = movieSlice;

const movieActions = {
    ...actions,
    getMovies,
    getGenres,
    getMoviesByGenre,
    searchMovies
}

export {
    movieActions,
    movieReducer
}