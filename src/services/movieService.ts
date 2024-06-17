import {IRes} from "../types/resType";
import {IMovie} from "../interfaces/movie.interface";
import {IPagination} from "../interfaces/paginationInterface";
import {apiService} from "./api.service";
import {urls} from "../constants/urls";

const movieService = {
    getMovies: (): IRes<IPagination<IMovie>> => apiService.get(urls.movies.base)
}

export {
    movieService
}