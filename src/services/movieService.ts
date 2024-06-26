import {IMovie} from "../interfaces/movies.interface";
import {IPagination} from "../interfaces/paginationInterface";
import {apiService, imageService} from "./api.service";
import {urls} from "../constants/urls";
import {IGenres} from "../interfaces/genres.interface";
import {AxiosResponse} from "axios";
import {IMovieInterface} from "../interfaces/movie.interface";

const movieService = {
    getMovies: async (page: string): Promise<AxiosResponse<IPagination<IMovie>>> => {
        return await apiService.get(urls.movies.base(page));
    },
    getImage: async (imageName: string): Promise<AxiosResponse<Blob>> => {
        const response = await imageService.get(urls.movies.getImage(imageName), {
            responseType: "blob"
        });
        return response.data;
    },
    getMovie: async (id: number): Promise<AxiosResponse<IMovieInterface>> => {
        return await apiService.get(urls.movies.movie_details(id));
    },
    searchByGenres: async (genreNumber: number, page: number): Promise<AxiosResponse<IPagination<IMovie>>> => await apiService.get(urls.movies.sortByGenres(genreNumber, page)),
    getGenres: async (): Promise<AxiosResponse<IGenres>> => await apiService.get(urls.movies.genres),
    searchMovies: async (movieName: string, page: string): Promise<AxiosResponse<IPagination<IMovie>>> => await apiService.get(urls.movies.searchMovie(movieName, page)),
}

export {
    movieService
}