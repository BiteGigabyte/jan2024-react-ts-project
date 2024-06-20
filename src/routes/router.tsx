import {createBrowserRouter, Navigate} from "react-router-dom";
import {MainLayout} from "../layouts/MainLayout";
import {GenresPage} from "../pages/GenresPage";
import {SearchPage} from "../pages/SearchPage";
import {MoviesPage} from "../pages/MoviesPage";
import {MoviePage} from "../pages/MoviePage";

const router = createBrowserRouter([
    {path: '', element: <MainLayout/>, children: [
            {index: true, element: <Navigate to='movies?page=1'/>},
            {path: 'movies', element: <MoviesPage/>},
            {path: 'genres', element: <GenresPage/>},
            {path: 'genres/:id', element: <GenresPage/>},
            {path: 'search', element: <SearchPage/>},
            {path: 'info/:id', element: <MoviePage/>},
        ]
    }
])

export {
    router
}