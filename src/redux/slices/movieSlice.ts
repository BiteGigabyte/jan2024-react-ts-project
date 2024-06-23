import {createAsyncThunk, createSlice, isFulfilled, isRejected} from "@reduxjs/toolkit";
import {IPagination} from "../../interfaces/paginationInterface";
import {IMovie} from "../../interfaces/movies.interface";
import {movieService} from "../../services/movieService";
import {IGenres} from "../../interfaces/genres.interface";

interface IState {
    movies: IMovie[];
    error: boolean | null;
    total_pages: number | null;
    genres: IGenres | null;
    moviesByGenre: IPagination<IMovie> | null;
    moviesBySearch: IPagination<IMovie> | null;
    searchName: string;
    searchPage: string | null;
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
    moviesBySearch: null,
    searchName: '',
    searchPage: null
};

interface SearchParams {
    searchName: string;
    searchPage: string;
}

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
            return response.data; // Повертаємо дані, які очікує createAsyncThunk
        } catch (error) {
            return rejectWithValue(error); // Обробляємо помилку
        }
    }
);

const searchMovies = createAsyncThunk<IPagination<IMovie>, {name: string, page: string }>(
    'movieSlice/searchMovies',
    async ({name, page}, { rejectWithValue }) => {
        try {
            const response = await movieService.searchMovies(name, page);
            return response.data; // Повертаємо дані, які очікує createAsyncThunk
        } catch (error) {
            return rejectWithValue(error); // Обробляємо помилку
        }
    }
);

const searchNameSaver = createAsyncThunk<SearchParams, SearchParams>(
    'movieSlice/searchNameSaver',
    async (params: SearchParams, { rejectWithValue }) => {
        try {
            // Повертаємо об'єкт, який містить searchName та searchPage
            return params;
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
            })
            .addCase(getGenres.fulfilled, (state, action) => {
                state.genres = action.payload;
            })
            .addCase(getMoviesByGenre.fulfilled, (state, action) => {
                state.moviesByGenre = action.payload;
            })
            .addCase(searchMovies.fulfilled, (state,  action) => {
            state.moviesBySearch = action.payload;
            })
            .addCase(searchNameSaver.fulfilled, (state, action) => {
                state.searchName = action.payload.searchName;
                state.searchPage = action.payload.searchPage;
            })
            .addMatcher(isRejected(getMovies), (state) => {
                state.error = true;
            })
            .addMatcher(isFulfilled(getMovies), (state) => {
                state.error = false;
            })
            .addMatcher(isRejected(getGenres), (state) => {
                state.error = true;
            })
            .addMatcher(isFulfilled(getGenres), (state) => {
                state.error = false;
            })
            .addMatcher(isRejected(getMoviesByGenre), (state) => {
                state.error = true;
            })
            .addMatcher(isFulfilled(getMoviesByGenre), (state) => {
                state.error = false;
            })
            .addMatcher(isRejected(searchMovies), (state) => {
                state.error = true;
            })
            .addMatcher(isFulfilled(searchMovies), (state) => {
                state.error = false;
            })
            .addMatcher(isRejected(searchNameSaver), (state) => {
                state.error = true;
            })
            .addMatcher(isFulfilled(searchNameSaver), (state) => {
                state.error = false;
            })

});

const {reducer: movieReducer, actions} = movieSlice;

const movieActions = {
    ...actions,
    getMovies,
    getGenres,
    getMoviesByGenre,
    searchMovies,
    searchNameSaver
}

export {
    movieActions,
    movieReducer
}