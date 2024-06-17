import {createBrowserRouter, Navigate} from "react-router-dom";
import {MainLayout} from "../layouts/MainLayout";
import {GenresPage} from "../pages/GenresPage";
import {SearchPage} from "../pages/SearchPage";
import {MoviesPage} from "../pages/MoviesPage";

const router = createBrowserRouter([
    {path: '', element: <MainLayout/>, children: [
            {index: true, element: <Navigate to='movies'/>},
            {path: 'movies', element: <MoviesPage/>},
            {path: 'genres', element: <GenresPage/>},
            {path: 'search', element: <SearchPage/>}
        ]
    }
])

export {
    router
}